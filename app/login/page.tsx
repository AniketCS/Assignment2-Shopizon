'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/lib/ui/footer/Footer';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const router = useRouter();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Storing token and user name
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);

      // Navigating to home page
      router.push('/');
    } catch {
      setError('Unexpected error, please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <h1 className={styles.title}>Log In</h1>
          {error && <p className={styles.errorMsg}>{error}</p>}

          <div>
            <label htmlFor="email" className={styles.fieldLabel}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.fieldInput}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.fieldLabel}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.fieldInput}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
          <div className="text-center mt-4">
  <a
    href="/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot your password?
  </a>
</div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
