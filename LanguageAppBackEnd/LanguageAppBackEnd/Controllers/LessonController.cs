using AutoMapper;
using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LanguageAppBackEnd.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly DataContext _context;
        private IMapper _mapper { get; set; }

        public LessonController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("all/{userId}")]
        public async Task<ActionResult<List<Lesson>>> GetAllLessons(string userId)
        {
            List<Lesson> res = _context.UserLesson
                .Include(x => x.Lesson)
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Lesson).ToList();
            return Ok(res);
        }

        [HttpGet("{id}/{userId}")]
        public async Task<ActionResult<LessonDTO>> GetLesson(string userId, int id)
        {
            var DBlesson = await _context.Lessons.FindAsync(id);
            LessonDTO lesson = new LessonDTO();
            lesson.lessonId = DBlesson.lessonId;
            lesson.lessonTitle = DBlesson.lessonTitle;
            lesson.createdDate = DBlesson.createdDate;
            lesson.lessonTitle = DBlesson.lessonTitle;


            var data =  (from task in _context.Task
                                  join lessonTasks in _context.LessonTaskLesson
                                  on task.taskId equals lessonTasks.TaskId
                                  join answers in _context.Answers 
                                  on task.taskId equals answers.lessonTaskId
                                  where lessonTasks.LessonId == id
                                  select new
                                  {
                                      task,
                                      answers
                                  })
                                 .ToList();
            //Thread.Sleep(1000);
            lesson.tasks = new List<lessonTask>();

            var DBRules = (from rule in _context.Rules
                                     join lessonRule in _context.LessonRules
                                     on rule.RuleId equals lessonRule.RuleId
                                     join less in _context.Lessons
                                     on lessonRule.LessonId equals less.lessonId
                                     where lessonRule.LessonId == id
                                 select new RuleDTO
                                 {
                                     RuleId = rule.RuleId,
                                     ruleTitle = rule.ruleTitle,
                                     ruleContent = rule.ruleContent,
                                     ruleImage = rule.ruleImage,
                                 })
                                 .ToList();

            //lesson.rules = DBRules;
            lesson.rules = DBRules;

            if (lesson.rules.Count() > 0 && userId != "0")
            {
                foreach (var rule in lesson.rules)
                {
                    //userId atsitemt
                   var temp =  _context.UserRules.Where(x => x.UserId == userId && x.RuleId == rule.RuleId);
                    if (temp != null) rule.isSaved = true;
                }
            }

            foreach (var values in data)
            {
                lessonTask temp = values.task;
                temp.answers.Add(values.answers);
                lesson.tasks.Add(temp);
                
            }


            if (lesson == null)
                return BadRequest("Lesson not found.");
            return Ok(lesson);
        }

        [HttpPost]
        [Authorize(Roles = "teacher")]
        public async Task<List<Lesson>> AddLesson([FromForm] LessonDTO request)
        {
             Lesson lesson = new Lesson();
            lesson.lessonTitle = request.lessonTitle;
            
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            UserLesson userLesson = new UserLesson();
            userLesson.UserId = request.userId;
            userLesson.LessonId = lesson.lessonId;
            Console.WriteLine(lesson.lessonId);
            _context.UserLesson.Add(userLesson);
            await _context.SaveChangesAsync();

            return _context.UserLesson
                .Include(x => x.Lesson)
                .Where(entry => entry.UserId == request.userId)
                .Select(entry => entry.Lesson).ToList();
        }

        [HttpPost("addTask")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> AddTaskToLesson([FromBody] AddToLessonDTO request)
        {
            request.tasksIds.ForEach(taskId =>
            {
                var lessonTaskLesson = new LessonTaskLesson();
                lessonTaskLesson.TaskId = taskId;
                lessonTaskLesson.LessonId = request.lessonId;
                _context.LessonTaskLesson.Add(lessonTaskLesson);
            });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("removeTask")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> RemoveTaskFromLesson([FromBody] RemoveFromLessonDTO request)
        {
            var lessonTaskLesson = new LessonTaskLesson();
            if (request.lessonId == null || request.taskId == null) return BadRequest();
            lessonTaskLesson.TaskId = (int)request.taskId;
            lessonTaskLesson.LessonId= request.lessonId;
            _context.LessonTaskLesson.Remove(lessonTaskLesson);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult<List<Lesson>>> UpdateLesson(int id, [FromForm] LessonDTO request)
        {
            if (request == null || !ModelState.IsValid)
                return BadRequest();

            var dbLesson = await _context.Lessons.FindAsync(id);
            if (dbLesson == null)
                return BadRequest("Lesson not found.");

            dbLesson.lessonTitle = request.lessonTitle;
            
            await _context.SaveChangesAsync();

            return Ok(dbLesson);
        }

        [HttpDelete("delete/{userId}/{lessonId}")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult<List<Lesson>>> DeleteLesson(string userId, int lessonId)
        {
            var dbLesson = await _context.Lessons.FindAsync(lessonId);
            if (dbLesson == null)
                return BadRequest("Lesson not found.");

            _context.Lessons.Remove(dbLesson);
            await _context.SaveChangesAsync();

            return Ok(_context.UserLesson
                .Include(x => x.Lesson)
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Lesson).ToList());
        }

        [HttpPost("addUsers")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> AddUserToLesson([FromBody] AddToLessonDTO request)
        {
            request.usersIds.ForEach(userId =>
            {
                var userLesson = new UserLesson();
                userLesson.UserId = userId;
                userLesson.LessonId = request.lessonId;
                _context.UserLesson.Add(userLesson);
            });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("removeUser")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> RemoveUserFromLesson([FromBody] RemoveFromLessonDTO request)
        {
            var userLesson = new UserLesson();
            if (request.lessonId == null || request.userId == null) return BadRequest();
            userLesson.UserId = request.userId;
            userLesson.LessonId = request.lessonId;
            _context.UserLesson.Remove(userLesson);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("getStudents/{lessonId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "teacher")]

        public async Task<ActionResult> GetLessonsStudents(int lessonId)
        {

            var users = await (from user in _context.Users
                               join userRole in _context.UserRoles
                               on user.Id equals userRole.UserId
                               join role in _context.Roles
                               on userRole.RoleId equals role.Id
                               join userLesson in _context.UserLesson
                               on user.Id equals userLesson.UserId
                               where role.Name == "Student" 
                               where userLesson.LessonId == lessonId
                               select new
                               {
                                    user.Id,
                                    role = role.Name,
                                    user.FirstName,
                                    user.LastName,
                                    user.Email,
                                    userLesson.status
                               })
                                 .ToListAsync();

            
            return Ok(users);
        }

        [HttpPost("addRule")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> AddRuleToLesson([FromBody] AddToLessonDTO request)
        {
            request.rulesIds.ForEach(ruleId =>
            {
                var lessonRule = new LessonRule();
                lessonRule.RuleId = ruleId;
                lessonRule.LessonId = request.lessonId;
                _context.LessonRules.Add(lessonRule);
            });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("removeRule")]
        [Authorize(Roles = "teacher")]

        public async Task<ActionResult> RemoveRuleFromLesson([FromBody] RemoveFromLessonDTO request)
        {
            var lessonRule = new LessonRule();
            if (request.lessonId == null || request.ruleId == null) return BadRequest();
            lessonRule.RuleId = (int)request.ruleId;
            lessonRule.LessonId = request.lessonId;
            _context.LessonRules.Remove(lessonRule);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("finished")]
        public async Task<ActionResult> lessonFinished([FromBody] AddToLessonDTO request)
        {
            var dbLesson = _context.UserLesson.Where(x => x.UserId == request.userId && x.LessonId == request.lessonId).First();

            dbLesson.completedDate = DateTime.Now;
            dbLesson.status = 2;
            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}
