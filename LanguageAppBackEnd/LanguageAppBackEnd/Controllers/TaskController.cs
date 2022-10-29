using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Facades;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet]
        public async Task<ActionResult<List<lessonTask>>> GetAllTasks()
        {
            return Ok(await _context.Task.ToListAsync());
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
            if(request.taskType != null) task.taskType = int.Parse(request.taskType);
            task.taskContent = request.taskContent;
            if (request.file != null) task.taskImage = request.file.FileName;

            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            if (request.file != null)
            {
                int taskId = task.taskId;
                await FileUploadind.SaveFileAsync("task", taskId, request.file);
            }
            
            return Ok(await _context.Task.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<lessonTask>>> UpdateTask( int id, [FromForm] TaskDTO request)
        {
            var dbTask = await _context.Task.FindAsync(id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            dbTask.taskTitle = request.taskTitle;
            dbTask.taskContent = request.taskContent;
            if (request.taskType != null) dbTask.taskType = int.Parse(request.taskType);
            if (request.file != null)
            {
                    dbTask.taskImage = request.file.FileName;
                    await FileUploadind.SaveFileAsync("task", id, request.file);
            }
            await _context.SaveChangesAsync();

            return Ok(await _context.Task.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<lessonTask>>> DeleteTask(int id)
        {
            var dbTask = await _context.Task.FindAsync(id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            _context.Task.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(await _context.Task.ToListAsync());
        }
    }
}
