using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Facades;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Web;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace LanguageAppBackEnd.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("tasks")]
        public async Task<ActionResult<List<lessonTask>>> GetAllTasks([FromBody] userTasksDTO data)
        {
            var tasks = _context.UserTask
                .Include(x => x.Task)
                .Include(x => x.Task.UserTask)
                .Where(entry => entry.UserId == data.userId)
                .Select(entry => new { entry.Task, entry.learned}).ToList();

            var answers = _context.Answers.ToList();
            var filteredTasks = tasks.Where(x => !data.tasksToFilter.Contains(x.Task.taskId));

            return Ok(data.tasksToFilter != null && data.tasksToFilter.Length > 0 ? filteredTasks : tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<lessonTask>> GetTask(int id)
        {
            var task = await _context.Task.FindAsync(id);
            if (task == null)
                return BadRequest("Task not found.");
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult> AddTask([FromForm] TaskDTO request)
        {

            lessonTask task = new lessonTask();
            task.taskTitle = request.taskTitle;
            if (request.taskType != null) task.taskType = int.Parse(request.taskType);
            task.taskContent = request.taskContent;
            if (request.file != null) task.taskImage = request.file.FileName;

            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            if (request.file != null)
            {
                int taskId = task.taskId;
                await FileUploadind.SaveFileAsync("task", taskId, request.file);
            }

            UserTask userTask = new UserTask();
            userTask.TaskId = task.taskId;
            userTask.UserId = request.userId;

            _context.UserTask.Add(userTask);
            await _context.SaveChangesAsync();

            return Ok(_context.UserTask
                .Include(x => x.Task)
                .Where(entry => entry.UserId == request.userId)
                .Select(entry => entry.Task).ToList());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<lessonTask>>> UpdateTask(int id, [FromForm] TaskDTO request)
        {
            var dbTask = await _context.Task.FindAsync(id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            dbTask.taskTitle = request.taskTitle;
            dbTask.taskContent = request.taskContent == "null"? null : request.taskContent;
            
            if (request.taskType != null) dbTask.taskType = int.Parse(request.taskType);
            if (request.file != null)
            {
                if (dbTask.taskImage != null) await FileUploadind.DeleteFileAsync("task", id, dbTask.taskImage);
                dbTask.taskImage = request.file.FileName;
                await FileUploadind.SaveFileAsync("task", id, request.file);
            }
            else
            {
                if(dbTask.taskImage != null)
                {
                    await FileUploadind.DeleteFileAsync("task", id, dbTask.taskImage);
                    dbTask.taskImage = null;
                }
            }
            
            await _context.SaveChangesAsync();

            return Ok(dbTask);
        }

        [HttpPut("learned/{userId}/{taskId}")]
        public async Task<ActionResult> UpdateLearnedTask(string userId, int taskid)
        {
            var dbUserTask = _context.UserTask.Where(x => x.TaskId == taskid && x.UserId == userId).First();
            if (dbUserTask == null)
                return BadRequest("Task not found.");

            dbUserTask.learned = true;
             _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("delete/{userId}/{taskId}")]
        public async Task<ActionResult<List<lessonTask>>> DeleteTask(string userId, int taskId)
        {
            var dbTask = await _context.Task.FindAsync(taskId);
            if (dbTask == null)
                return BadRequest("Task not found.");

            _context.Task.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(_context.UserTask
            .Include(x => x.Task)
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Task).ToList());
        }

        [HttpPost("addUser")]
        public async Task<ActionResult<List<lessonTask>>> AddUserToTask([FromBody] userTasksDTO request)
        {
            request.tasksIds.ToList().ForEach(id =>
            {
                UserTask userTask = new UserTask();
                userTask.TaskId = id;
                userTask.UserId = request.userId;

                if (_context.UserTask.Where(x => x.UserId == request.userId && x.TaskId == id).ToList().Count == 0)
                {
                    _context.UserTask.Add(userTask);
                }


                var dbTask = _context.Task.Find(id);
                dbTask.mistakesCount += 1;

                _context.SaveChanges();

            });

            return Ok();
        }

        [HttpDelete("removeUser/{userId}/{taskId}")]
        public async Task<ActionResult<List<lessonTask>>> RemoveUserFromTask(string userId, int taskId)
        {
            var dbTask = _context.UserTask.Where(x => x.UserId == userId && x.TaskId == taskId).First();
            if (dbTask == null)
                return BadRequest("Task not found.");

            _context.UserTask.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(_context.UserTask
            .Include(x => x.Task)
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Task).ToList());
        }
    }
}
