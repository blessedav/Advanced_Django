from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from usersapp.models import User


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    is_technical = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class Resume(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='resumes'
    )
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='resumes/')
    content_type = models.CharField(max_length=100)  # PDF, DOCX, etc.
    is_parsed = models.BooleanField(default=False)
    raw_text = models.TextField(blank=True)  # Extracted text from resume
    skills = models.ManyToManyField(Skill, related_name='resumes', blank=True)
    overall_rating = models.FloatField(
        default=0, 
        validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.username}'s resume - {self.title}"


class Education(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='education'
    )
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-end_date', '-start_date']
        verbose_name_plural = 'Education'
    
    def __str__(self):
        return f"{self.degree} at {self.institution}"


class Experience(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='experience'
    )
    company = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    skills_used = models.ManyToManyField(
        Skill, related_name='experiences', blank=True
    )
    
    class Meta:
        ordering = ['-end_date', '-start_date']
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class Job(models.Model):
    ACTIVE = 'active'
    CLOSED = 'closed'
    DRAFT = 'draft'
    
    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
        (DRAFT, 'Draft'),
    ]
    
    recruiter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='jobs'
    )
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=DRAFT
    )
    skills_required = models.ManyToManyField(
        Skill, related_name='jobs', blank=True
    )
    experience_required = models.IntegerField(
        default=0, validators=[MinValueValidator(0)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class ResumeJobMatch(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='job_matches'
    )
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name='resume_matches'
    )
    match_score = models.FloatField(
        default=0, 
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    skill_match_percentage = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    experience_match_percentage = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('resume', 'job')
        ordering = ['-match_score']
    
    def __str__(self):
        return (
            f"Match: {self.resume.title} - {self.job.title} "
            f"({self.match_score:.2f}%)"
        )


class ResumeFeedback(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='feedback'
    )
    skill_gaps = models.TextField(blank=True)
    formatting_suggestions = models.TextField(blank=True)
    keyword_optimization = models.TextField(blank=True)
    overall_suggestions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"Feedback for {self.resume.title}"
