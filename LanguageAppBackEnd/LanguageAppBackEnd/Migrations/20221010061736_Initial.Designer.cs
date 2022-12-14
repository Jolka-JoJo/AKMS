// <auto-generated />
using System;
using LanguageAppBackEnd.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221010061736_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LanguageAppBackEnd.Models.Answer", b =>
                {
                    b.Property<int>("AnswerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AnswerId"), 1L, 1);

                    b.Property<string>("AnswerContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<int>("lessonTaskId")
                        .HasColumnType("int");

                    b.HasKey("AnswerId");

                    b.HasIndex("lessonTaskId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("LanguageAppBackEnd.Models.Lesson", b =>
                {
                    b.Property<int>("lessonId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("lessonId"), 1L, 1);

                    b.Property<DateTime>("createdDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("lessonTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("status")
                        .HasColumnType("int");

                    b.HasKey("lessonId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("LanguageAppBackEnd.Models.LessonTask", b =>
                {
                    b.Property<int>("taskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("taskId"), 1L, 1);

                    b.Property<string>("taskContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("taskImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("taskTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("taskType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("taskId");

                    b.ToTable("Task");
                });

            modelBuilder.Entity("LessonLessonTask", b =>
                {
                    b.Property<int>("lessonslessonId")
                        .HasColumnType("int");

                    b.Property<int>("taskstaskId")
                        .HasColumnType("int");

                    b.HasKey("lessonslessonId", "taskstaskId");

                    b.HasIndex("taskstaskId");

                    b.ToTable("LessonLessonTask");
                });

            modelBuilder.Entity("LanguageAppBackEnd.Models.Answer", b =>
                {
                    b.HasOne("LanguageAppBackEnd.Models.LessonTask", "lessonTask")
                        .WithMany("answers")
                        .HasForeignKey("lessonTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("lessonTask");
                });

            modelBuilder.Entity("LessonLessonTask", b =>
                {
                    b.HasOne("LanguageAppBackEnd.Models.Lesson", null)
                        .WithMany()
                        .HasForeignKey("lessonslessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LanguageAppBackEnd.Models.LessonTask", null)
                        .WithMany()
                        .HasForeignKey("taskstaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LanguageAppBackEnd.Models.LessonTask", b =>
                {
                    b.Navigation("answers");
                });
#pragma warning restore 612, 618
        }
    }
}
