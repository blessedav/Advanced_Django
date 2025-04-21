# AI-Powered Job Board Platform

A sophisticated Django-based job board platform that leverages artificial intelligence to revolutionize the recruitment process through intelligent resume parsing, job matching, and personalized feedback.

## Key Features

### Authentication & User Management

- Secure JWT-based authentication system
- Multi-role user management (Job Seeker, Recruiter, Admin)
- Comprehensive email verification workflow
- Robust password reset functionality

### Resume Processing & Analysis

- Support for PDF and DOCX resume uploads
- Advanced AI-powered extraction of professional details
- Automated resume evaluation against job requirements
- Intelligent parsing of skills, experience, and educational background

### Intelligent Job Matching

- Sophisticated NLP-based resume-job matching algorithm
- Advanced filtering capabilities for recruiters
- Comprehensive scoring system for candidate-job compatibility
- Location-based and skill-based candidate filtering

### Resume Enhancement

- Personalized feedback system including:
  - Strategic skill gap analysis
  - Professional formatting recommendations
  - ATS-optimized keyword suggestions

## Technical Architecture

- **Backend Framework**: Django with Django REST Framework
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Task Management**: Celery with Redis
- **AI Integration**: OpenAI GPT-4
- **Document Processing**: PyPDF2, docx2txt
- **API Documentation**: Swagger/ReDoc via drf-yasg

## Getting Started

### Prerequisites

- Python 3.9 or higher
- PostgreSQL database
- Redis server
- OpenAI API credentials

### Configuration

Create a `.env` file in the project root directory with the following configuration:

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

### Installation Guide

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/job-board-platform.git
   cd job-board-platform
   ```

2. Set up the virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install project dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:

   ```bash
   python manage.py migrate
   ```

5. Create an administrative user:

   ```bash
   python manage.py createsuperuser
   ```

6. Launch the development server:

   ```bash
   python manage.py runserver
   ```

7. Start the Celery worker:
   ```bash
   celery -A miniproject worker -l info
   ```

## API Documentation

Access the comprehensive API documentation through:

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## API Endpoints

### Authentication

- `POST /api/auth/register/`: User registration
- `POST /api/auth/login/`: User authentication
- `POST /api/auth/refresh-token/`: Token refresh
- `POST /api/auth/verify-email/`: Email verification
- `POST /api/auth/request-password-reset/`: Password reset request
- `POST /api/auth/reset-password-confirm/`: Password reset confirmation

### Resume Management

- `GET /api/resume/resumes/`: Retrieve resume list
- `POST /api/resume/resumes/`: Create new resume
- `GET /api/resume/resumes/{id}/`: Get detailed resume information
- `POST /api/resume/resumes/{id}/parse/`: Initiate resume parsing
- `POST /api/resume/resumes/{id}/generate_feedback/`: Generate resume feedback
- `POST /api/resume/resumes/{id}/match_jobs/`: Match resume with available positions

### Job Management

- `GET /api/resume/jobs/`: List available positions
- `POST /api/resume/jobs/`: Create new job posting
- `GET /api/resume/jobs/{id}/`: Get job details
- `POST /api/resume/jobs/{id}/match_resumes/`: Match job with potential candidates

### Skill Management

- `GET /api/resume/skills/`: List available skills
- `POST /api/resume/skills/`: Add new skill

## License

This project is licensed under the MIT License. For detailed information, please refer to the LICENSE file.
