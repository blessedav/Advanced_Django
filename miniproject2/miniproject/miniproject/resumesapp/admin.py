from django.contrib import admin

from .models import (Education, Experience, Job, Resume, ResumeFeedback,
                     ResumeJobMatch, Skill)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_technical')
    search_fields = ('name', 'category')
    list_filter = ('is_technical', 'category')


class EducationInline(admin.TabularInline):
    model = Education
    extra = 1


class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'user', 'content_type', 'is_parsed', 
        'overall_rating', 'created_at'
    )
    list_filter = ('is_parsed', 'content_type', 'created_at')
    search_fields = ('title', 'user__username', 'raw_text')
    inlines = (EducationInline, ExperienceInline)
    filter_horizontal = ('skills',)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'company', 'location', 'recruiter', 
        'status', 'created_at'
    )
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'company', 'description', 'requirements')
    filter_horizontal = ('skills_required',)


@admin.register(ResumeJobMatch)
class ResumeJobMatchAdmin(admin.ModelAdmin):
    list_display = (
        'resume', 'job', 'match_score', 
        'skill_match_percentage', 'created_at'
    )
    list_filter = ('created_at',)
    search_fields = ('resume__title', 'job__title', 'feedback')


@admin.register(ResumeFeedback)
class ResumeFeedbackAdmin(admin.ModelAdmin):
    list_display = ('resume', 'created_at', 'updated_at')
    search_fields = (
        'resume__title', 'skill_gaps', 'formatting_suggestions',
        'keyword_optimization', 'overall_suggestions'
    )
