﻿using AutoMapper;
using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
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
    public class LessonController : Controller
    {
        private readonly DataContext _context;
        private IMapper _mapper { get; set; }

        public LessonController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Lesson>>> GetAllLessons()
        {
            return Ok(await _context.Lessons.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null)
                return BadRequest("Lesson not found.");
            return Ok(lesson);
        }

        [HttpPost]
        public async Task<ActionResult> AddLesson([FromForm] LessonDTO request)
        {
            if (request == null || !ModelState.IsValid)
                return BadRequest();

            Lesson lesson = new Lesson();
            lesson.lessonTitle = request.lessonTitle;
           // lesson.status = 
            
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return Ok(await _context.Lessons.ToListAsync());
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

            return Ok(await _context.Lessons.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Lesson>>> DeleteLesson(int id)
        {
            var dbLesson = await _context.Lessons.FindAsync(id);
            if (dbLesson == null)
                return BadRequest("Lesson not found.");

            _context.Lessons.Remove(dbLesson);
            await _context.SaveChangesAsync();

            return Ok(await _context.Lessons.ToListAsync());
        }
    }
}
