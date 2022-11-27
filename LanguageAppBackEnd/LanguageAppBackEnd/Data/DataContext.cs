using LanguageAppBackEnd.Configuration;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackEnd.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //LessonTask

            modelBuilder.Entity<LessonTaskLesson>()
            .HasKey(bc => new { bc.LessonId, bc.TaskId });

            modelBuilder.Entity<LessonTaskLesson>()
                .HasOne(bc => bc.Task)
                .WithMany(b => b.LessonTaskLesson)
                .HasForeignKey(bc => bc.TaskId);

            modelBuilder.Entity<LessonTaskLesson>()
                .HasOne(bc => bc.Lesson)
                .WithMany(c => c.LessonTaskLesson)
                .HasForeignKey(bc => bc.LessonId);

            //UserLesson

            modelBuilder.Entity<UserLesson>()
            .HasKey(bc => new { bc.LessonId, bc.UserId });

            modelBuilder.Entity<UserLesson>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserLesson)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<UserLesson>()
                .HasOne(bc => bc.Lesson)
                .WithMany(c => c.UserLesson)
                .HasForeignKey(bc => bc.LessonId);
            
            //UserTask

            modelBuilder.Entity<UserTask>()
            .HasKey(bc => new { bc.TaskId, bc.UserId });

            modelBuilder.Entity<UserTask>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserTask)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<UserTask>()
                .HasOne(bc => bc.Task)
                .WithMany(c => c.UserTask)
                .HasForeignKey(bc => bc.TaskId);

            //WordCategory
            modelBuilder.Entity<CategoryWord>()
            .HasKey(bc => new { bc.CategoryId, bc.WordPhraseId });

            modelBuilder.Entity<CategoryWord>()
                .HasOne(bc => bc.Category)
                .WithMany(b => b.CategoryWords)
                .HasForeignKey(bc => bc.CategoryId);

            modelBuilder.Entity<CategoryWord>()
                .HasOne(bc => bc.WordPhrase)
                .WithMany(c => c.CategoryWords)
                .HasForeignKey(bc => bc.WordPhraseId);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());

        }

        public DbSet<lessonTask> Task { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LessonTaskLesson> LessonTaskLesson { get; set; }
        public DbSet<UserLesson> UserLesson { get; set; }
        public DbSet<UserTask> UserTask { get; set; }
        public DbSet<WordPhrase> WordPhrases { get; set; }
        public DbSet<CategoryWord> CategoryWords { get; set; }
        public DbSet<Category> Categories { get; set; }

    }
}
