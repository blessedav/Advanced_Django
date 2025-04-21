from rest_framework import serializers

from .models import (Education, Experience, Job, Resume, ResumeFeedback,
                     ResumeJobMatch, Skill)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'category', 'description', 'is_technical')


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = (
            'id', 'institution', 'degree', 'field_of_study', 
            'start_date', 'end_date', 'is_current', 'description'
        )


class ExperienceSerializer(serializers.ModelSerializer):
    skills_used = SkillSerializer(many=True, required=False, read_only=True)
    skill_ids = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False
    )
    
    class Meta:
        model = Experience
        fields = (
            'id', 'company', 'title', 'location', 'start_date', 
            'end_date', 'is_current', 'description', 'skills_used', 'skill_ids'
        )
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        experience = Experience.objects.create(**validated_data)
        
        if skill_ids:
            skills = Skill.objects.filter(id__in=skill_ids)
            experience.skills_used.set(skills)
        
        return experience
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if skill_ids is not None:
            skills = Skill.objects.filter(id__in=skill_ids)
            instance.skills_used.set(skills)
        
        return instance


class ResumeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False, read_only=True)
    education = EducationSerializer(many=True, required=False)
    experience = ExperienceSerializer(many=True, required=False)
    skill_ids = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False
    )
    content_type = serializers.CharField(read_only=True)
    is_parsed = serializers.BooleanField(read_only=True)
    raw_text = serializers.CharField(read_only=True)
    overall_rating = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Resume
        fields = (
            'id', 'user', 'title', 'file', 'content_type', 'is_parsed', 
            'raw_text', 'skills', 'skill_ids', 'education', 'experience', 
            'overall_rating', 'created_at', 'updated_at'
        )
        read_only_fields = ('user', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        education_data = validated_data.pop('education', [])
        experience_data = validated_data.pop('experience', [])
        skill_ids = validated_data.pop('skill_ids', [])
        
        # Infer content type from file extension
        file = validated_data.get('file', None)
        if file:
            filename = file.name.lower()
            if filename.endswith('.pdf'):
                validated_data['content_type'] = 'application/pdf'
            elif filename.endswith('.docx'):
                content_type = 'application/vnd.openxmlformats-officedocument'
                content_type += '.wordprocessingml.document'
                validated_data['content_type'] = content_type
            elif filename.endswith('.doc'):
                validated_data['content_type'] = 'application/msword'
            else:
                validated_data['content_type'] = 'text/plain'
        
        resume = Resume.objects.create(**validated_data)
        
        # Add skills
        if skill_ids:
            skills = Skill.objects.filter(id__in=skill_ids)
            resume.skills.set(skills)
        
        # Add education
        for edu_data in education_data:
            Education.objects.create(resume=resume, **edu_data)
        
        # Add experience
        for exp_data in experience_data:
            exp_skills = None
            if 'skill_ids' in exp_data:
                exp_skills = exp_data.pop('skill_ids')
            
            experience = Experience.objects.create(
                resume=resume, **exp_data
            )
            
            if exp_skills:
                skills = Skill.objects.filter(id__in=exp_skills)
                experience.skills_used.set(skills)
        
        return resume


class JobSerializer(serializers.ModelSerializer):
    skills_required = SkillSerializer(many=True, required=False, read_only=True)
    skill_ids = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False
    )
    
    class Meta:
        model = Job
        fields = (
            'id', 'recruiter', 'title', 'company', 'location', 'description', 
            'requirements', 'status', 'skills_required', 'skill_ids', 
            'experience_required', 'created_at', 'updated_at'
        )
        read_only_fields = ('created_at', 'updated_at')
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        job = Job.objects.create(**validated_data)
        
        if skill_ids:
            skills = Skill.objects.filter(id__in=skill_ids)
            job.skills_required.set(skills)
        
        return job
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if skill_ids is not None:
            skills = Skill.objects.filter(id__in=skill_ids)
            instance.skills_required.set(skills)
        
        return instance


class ResumeJobMatchSerializer(serializers.ModelSerializer):
    resume_title = serializers.CharField(source='resume.title', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    
    class Meta:
        model = ResumeJobMatch
        fields = (
            'id', 'resume', 'job', 'resume_title', 'job_title', 'match_score', 
            'skill_match_percentage', 'experience_match_percentage', 
            'feedback', 'created_at'
        )
        read_only_fields = (
            'match_score', 'skill_match_percentage', 
            'experience_match_percentage', 'feedback', 'created_at'
        )


class ResumeFeedbackSerializer(serializers.ModelSerializer):
    resume_title = serializers.CharField(source='resume.title', read_only=True)
    
    class Meta:
        model = ResumeFeedback
        fields = (
            'id', 'resume', 'resume_title', 'skill_gaps', 
            'formatting_suggestions', 'keyword_optimization', 
            'overall_suggestions', 'created_at', 'updated_at'
        )
        read_only_fields = (
            'skill_gaps', 'formatting_suggestions', 'keyword_optimization', 
            'overall_suggestions', 'created_at', 'updated_at'
        ) 