'use client';

import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header-section">
          <h1 className="main-title">
            UPS Mailbox Management System
          </h1>
          <p className="main-description">
            Secure access to your mailbox information and management portal
          </p>
        </div>

        {/* Sign-in Options */}
        <div className="signin-grid">
          {/* User Sign-in Card */}
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
            <button className="signin-button user-button">
              Sign in as User
            </button>
          </div>

          {/* Admin Sign-in Card */}
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
            <button className="signin-button admin-button">
              Sign in as Admin
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>
            UPS Mailbox Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}