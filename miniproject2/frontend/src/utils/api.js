import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // If no refresh token, logout user
          localStorage.removeItem('token');
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const response = await axios.post(`${API_URL}/auth/refresh-token/`, {
          refresh: refreshToken,
        });
        
        // If token refresh was successful
        if (response.data.access) {
          localStorage.setItem('token', response.data.access);
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If token refresh failed, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: (credentials) => apiClient.post('/auth/login/', credentials),
  register: (userData) => apiClient.post('/auth/register/', userData),
  verifyEmail: (token) => apiClient.post('/auth/verify-email/', { token }),
  requestPasswordReset: (email) => apiClient.post('/auth/request-password-reset/', { email }),
  resetPassword: (data) => apiClient.post('/auth/reset-password-confirm/', data),
};

// Resume Service
export const resumeService = {
  getResumes: () => apiClient.get('/resume/resumes/'),
  getResumeById: (id) => apiClient.get(`/resume/resumes/${id}/`),
  createResume: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return apiClient.post('/resume/resumes/', formData, config);
  },
  parseResume: (id) => apiClient.post(`/resume/resumes/${id}/parse/`),
  generateFeedback: (id) => apiClient.post(`/resume/resumes/${id}/generate_feedback/`),
  matchJobs: (id, jobIds) => apiClient.post(`/resume/resumes/${id}/match_jobs/`, { job_ids: jobIds }),
  getJobMatches: (id) => apiClient.get(`/resume/resumes/${id}/job_matches/`),
};

// Job Service
export const jobService = {
  getJobs: (filters) => apiClient.get('/resume/jobs/', { params: filters }),
  getJobById: (id) => apiClient.get(`/resume/jobs/${id}/`),
  createJob: (jobData) => apiClient.post('/resume/jobs/', jobData),
  updateJob: (id, jobData) => apiClient.put(`/resume/jobs/${id}/`, jobData),
  matchResumes: (id, resumeIds) => apiClient.post(`/resume/jobs/${id}/match_resumes/`, { resume_ids: resumeIds }),
  getResumeMatches: (id) => apiClient.get(`/resume/jobs/${id}/resume_matches/`),
};

// Skill Service
export const skillService = {
  getSkills: (filters) => apiClient.get('/resume/skills/', { params: filters }),
  createSkill: (skillData) => apiClient.post('/resume/skills/', skillData),
};

export default apiClient; 