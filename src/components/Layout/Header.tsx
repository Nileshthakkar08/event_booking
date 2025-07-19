import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, Menu, X, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-card sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-primary-900 rounded-xl group-hover:bg-primary-800 transition-colors duration-200">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-900">EventBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-primary-900 bg-primary-50' 
                  : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/events') 
                  ? 'text-primary-900 bg-primary-50' 
                  : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
              }`}
            >
              Events
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-primary-900 bg-primary-50' 
                    : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                }`}
              >
                Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive('/admin') 
                    ? 'text-primary-900 bg-primary-50' 
                    : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 text-secondary hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-all duration-200">
                  <Bell className="h-5 w-5" />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 text-secondary hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block font-medium">{user.name}</span>
                  </button>
                
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-premium py-2 z-50 border border-gray-100 animate-scale-in">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-secondary hover:text-primary-900 hover:bg-primary-50 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-3 text-sm text-secondary hover:text-primary-900 hover:bg-primary-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-accent-600 hover:text-accent-700 hover:bg-accent-50 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-primary-900 bg-primary-50' 
                    : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive('/events') 
                    ? 'text-primary-900 bg-primary-50' 
                    : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive('/dashboard') 
                      ? 'text-primary-900 bg-primary-50' 
                      : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive('/admin') 
                      ? 'text-primary-900 bg-primary-50' 
                      : 'text-secondary hover:text-primary-900 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;