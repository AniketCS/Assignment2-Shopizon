'use client';

import React, { useState, FormEvent } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('If that email exists, you’ll receive a reset link shortly.');
    } else {
      setMessage(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow space-y-4">
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          {message && <p className="text-center">{message}</p>}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Send reset link
          </button>
        </form>
      </main>
    </div>
  );
}
