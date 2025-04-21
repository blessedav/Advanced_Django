import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {job.title}
          </h3>
          <p className="text-gray-600 mt-1">{job.company}</p>
        </div>
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {job.status}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{job.experience_required} years experience</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills_required && job.skills_required.map((skill) => (
            <span
              key={skill.id}
              className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800"
            >
              {skill.name}
            </span>
          ))}
          {(!job.skills_required || job.skills_required.length === 0) && (
            <span className="text-gray-500 text-sm">No specific skills listed</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <Link
          to={`/jobs/${job.id}`}
          className="btn-primary"
        >
          View Details
        </Link>
        
        <p className="text-gray-500 text-sm">
          Posted: {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default JobCard; 