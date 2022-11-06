using AutoMapper;
using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Facades;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Web;
using System.Collections.Generic;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var DBlesson = await _context.Lessons.FindAsync(id);
            LessonDTO lesson = new LessonDTO();
            lesson.lessonId = DBlesson.lessonId;
            lesson.lessonTitle = DBlesson.lessonTitle;
            lesson.createdDate = DBlesson.createdDate;
            lesson.status = DBlesson.status;
            lesson.lessonTitle = DBlesson.lessonTitle;

            lesson.tasks = _context.LessonTaskLesson
                .Include(x => x.Task)
                .Where(entry => entry.LessonId == id)
                .Select(entry => entry.Task).ToArray();

            if (lesson == null)
                return BadRequest("Lesson not found.");
            return Ok(lesson);
        }

        [HttpPost]
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
        public async Task<ActionResult> AddTaskToLesson([FromBody] AddTaskToLessonDTO request)
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

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Lesson>>> UpdateLesson(int id, [FromForm] LessonDTO request)
        {
            if (request == null || !ModelState.IsValid)
                return BadRequest();

            var dbLesson = await _context.Lessons.FindAsync(id);
            if (dbLesson == null)
                return BadRequest("Lesson not found.");

            dbLesson.lessonTitle = request.lessonTitle;
            dbLesson.status = request.status.Value;
            
            await _context.SaveChangesAsync();

            return Ok(dbLesson);
        }

        [HttpDelete("delete/{userId}/{lessonId}")]
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

        [HttpPost("{lessonId}/{userId}")]
        public async Task<ActionResult> AddUserToLesson(int lessonId, string userId)
        {
            var userLesson = new UserLesson();
            userLesson.UserId = userId;
            userLesson.LessonId = lessonId;
            _context.UserLesson.Add(userLesson);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
