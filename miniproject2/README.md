# Job Board Platform with AI Resume Parsing and Matching

A Django-based job board platform with AI-powered resume parsing, job matching, and resume feedback features.

## Features

### Authentication & User Management

- JWT-based authentication
- User roles: Job Seeker, Recruiter, Admin
- Email verification
- Password reset functionality

### Resume Upload & Parsing

- Upload resumes in PDF and DOCX formats
- AI extracts key details (skills, experience, education)
- Automated resume rating based on job descriptions

### Job Matching System

- AI matches resumes with job descriptions using NLP
- Recruiters can filter candidates based on skills, experience, and location
- Scoring system for resume-job compatibility

### Resume Feedback & Suggestions

- Users receive feedback on:
  - Skill gaps (based on job trends)
  - Resume formatting suggestions
  - Keyword optimization for ATS (Applicant Tracking Systems)

## Technology Stack

- **Backend**: Django, Django REST Framework
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Task Queue**: Celery, Redis
- **AI/ML**: OpenAI GPT-4
- **File Processing**: PyPDF2, docx2txt
- **Documentation**: Swagger/ReDoc via drf-yasg

## Setup Instructions

### Prerequisites

- Python 3.9+
- PostgreSQL
- Redis
- OpenAI API Key

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
POSTGRES_DB=miniproject
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

REDIS_URL=redis://localhost:6379/0

SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

FRONTEND_URL=http://localhost:3000

OPENAI_API_KEY=your-openai-api-key-here

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/job-board-platform.git
   cd job-board-platform
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:

   ```bash
   python manage.py runserver
   ```

7. Start Celery worker:
   ```bash
   celery -A miniproject worker -l info
   ```

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## Main API Endpoints

### Authentication

- `POST /api/auth/register/`: Register a new user
- `POST /api/auth/login/`: Login
- `POST /api/auth/refresh-token/`: Refresh JWT token
- `POST /api/auth/verify-email/`: Verify email
- `POST /api/auth/request-password-reset/`: Request password reset
- `POST /api/auth/reset-password-confirm/`: Confirm password reset

### Resumes

- `GET /api/resume/resumes/`: List resumes
- `POST /api/resume/resumes/`: Create resume
- `GET /api/resume/resumes/{id}/`: Get resume details
- `POST /api/resume/resumes/{id}/parse/`: Parse resume
- `POST /api/resume/resumes/{id}/generate_feedback/`: Generate resume feedback
- `POST /api/resume/resumes/{id}/match_jobs/`: Match resume with jobs

### Jobs

- `GET /api/resume/jobs/`: List jobs
- `POST /api/resume/jobs/`: Create job
- `GET /api/resume/jobs/{id}/`: Get job details
- `POST /api/resume/jobs/{id}/match_resumes/`: Match job with resumes

### Skills

- `GET /api/resume/skills/`: List skills
- `POST /api/resume/skills/`: Create skill

## License

This project is licensed under the MIT License - see the LICENSE file for details.
