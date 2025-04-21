import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isRecruiter, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Job Board</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                Home
              </Link>
              
              <Link to="/jobs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                Jobs
              </Link>
              
              {isAuthenticated && (
                <>
                  {/* Links for all authenticated users */}
                  <Link to="/resumes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                    My Resumes
                  </Link>
                  
                  {/* Recruiter specific links */}
                  {isRecruiter && (
                    <Link to="/manage-jobs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                      Manage Jobs
                    </Link>
                  )}
                  
                  {/* Admin specific links */}
                  {isAdmin && (
                    <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary-800 hover:bg-primary-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary-800 hover:bg-primary-900"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              
              {/* Icon for X */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link
            to="/jobs"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Jobs
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/resumes"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                My Resumes
              </Link>
              
              {isRecruiter && (
                <Link
                  to="/manage-jobs"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Jobs
                </Link>
              )}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-primary-800 hover:bg-primary-900"
              >
                Logout
              </button>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary-800 hover:bg-primary-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 