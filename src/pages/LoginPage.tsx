import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(name, email, password);
      }

      if (success) {
        navigate('/dashboard');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
            <div className="p-3 bg-primary-900 rounded-2xl group-hover:bg-primary-800 transition-colors duration-200">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-primary-900">EventBook</span>
          </Link>
          
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-lg text-secondary">
            {isLogin ? 'Sign in to your account' : 'Join us and start booking events'}
          </p>
        </div>

        {/* Demo Credentials */}
        {/* <div className="card p-6">
          <h3 className="font-semibold text-primary-900 mb-4 flex items-center">
            <div className="p-1 bg-primary-50 rounded mr-2">
              <User className="h-4 w-4 text-primary-900" />
            </div>
            Demo Credentials
          </h3>
          <div className="text-sm text-secondary space-y-2">
            <p><strong>User:</strong> user@demo.com / password</p>
            <p><strong>Admin:</strong> admin@demo.com / admin</p>
          </div>
        </div> */}

        <form className="card p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-12"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-primary-900 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary-900 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
              <p className="text-sm text-accent-700 font-medium">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-900 hover:text-accent-600 font-medium transition-colors duration-200"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;