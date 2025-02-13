'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LandingPage() {
  const { login, isLoading, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLoginForm, setShowLoginForm] = useState<'user' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (role: 'user' | 'admin') => {
    try {
      await login(email, password, role);
      const redirect = searchParams.get('redirect') || (role === 'admin' ? '/admin' : '/dashboard');
      router.push(redirect);
    } catch (err) {
      // Error is handled by auth context
    }
  };

  const renderLoginForm = () => {
    if (!showLoginForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Sign in as {showLoginForm === 'admin' ? 'Admin' : 'User'}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin(showLoginForm);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLoginForm(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    flex items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">
          The UPS Store Fremont Hub
          </h1>
          <p className="main-description">
            Secure access to your mailbox information and management portal
          </p>
        </div>

        <div className="signin-grid">
          <div className="signin-card">
            <div className="card-content">
              <div className="icon-wrapper user-icon-wrapper">
                <Mail className="icon user-icon" />
              </div>
              <h2 className="card-title">
                Mailbox User
              </h2>
              <p className="card-description">
                Access your mailbox details and manage your preferences
              </p>
            </div>
            <button 
              className="signin-button user-button"
              onClick={() => setShowLoginForm('user')}
            >
              Sign in as User
            </button>
          </div>

          <div className="signin-card">
            <div className="card-content">
              <div className="icon-wrapper admin-icon-wrapper">
                <ShieldCheck className="icon admin-icon" />
              </div>
              <h2 className="card-title">
                UPS Admin
              </h2>
              <p className="card-description">
                Manage mailboxes and access administrative controls
              </p>
            </div>
            <button 
              className="signin-button admin-button"
              onClick={() => setShowLoginForm('admin')}
            >
              Sign in as Admin
            </button>
          </div>
        </div>

        <div className="footer">
          <p>UPS Mailbox Management. All rights reserved.</p>
        </div>
      </div>
      {renderLoginForm()}
    </div>
  );
}