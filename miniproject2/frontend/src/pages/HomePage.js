import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { jobService } from '../utils/api';

const HomePage = () => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getJobs({ status: 'active', limit: 4 });
        setRecentJobs(response.data);
      } catch (err) {
        console.error('Error fetching recent jobs:', err);
        setError('Failed to load recent jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Dream Job with AI-Powered Matching
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Upload your resume and let our AI match you with the perfect job opportunities 
              based on your skills, experience, and preferences.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/upload-resume" className="btn-primary text-center py-3 px-8 text-lg">
                Upload Your Resume
              </Link>
              <Link to="/jobs" className="px-8 py-3 border border-white text-white rounded-md hover:bg-white hover:text-primary-700 transition-colors duration-300 text-center text-lg">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Powered by AI</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced AI to transform your job search and recruitment process.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Smart Resume Parsing</h3>
              <p className="mt-2 text-gray-600">
                Automatically extract your skills, experience, and education from your resume.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Intelligent Job Matching</h3>
              <p className="mt-2 text-gray-600">
                Get matched with jobs that align with your skills, experience, and career goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Resume Feedback</h3>
              <p className="mt-2 text-gray-600">
                Receive personalized feedback to improve your resume and increase your chances of landing interviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent jobs section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Job Openings</h2>
            <Link to="/jobs" className="text-primary-700 hover:text-primary-800 font-medium">
              View All Jobs →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading recent jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              
              {recentJobs.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-600">
                  <p>No active jobs found. Check back later for new opportunities!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to find your perfect match?</h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Join thousands of job seekers who have found their dream jobs through our platform.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-primary-700 rounded-md hover:bg-gray-100 transition-colors duration-300 text-lg font-medium"
            >
              Sign Up Now - It's Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 