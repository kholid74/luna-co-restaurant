'use client'

import { useActionState } from 'react'
import { login } from '@/app/admin/actions'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#fff',
          borderRadius: 24,
          padding: '40px 36px',
          boxShadow: '0 32px 80px rgba(0,0,0,.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span
            style={{
              display: 'inline-grid',
              placeItems: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--ink)',
              color: '#fff',
              fontFamily: 'var(--font-instrument-serif, serif)',
              fontSize: 28,
              fontStyle: 'italic',
              marginBottom: 12,
            }}
          >
            L
          </span>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-.03em' }}>
            Luma &amp; Co. Admin
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: 14 }}>
            Masuk untuk mengelola restoran
          </p>
        </div>

        {state?.error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 10,
              background: '#fee2e2',
              color: '#991b1b',
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            {state.error}
          </div>
        )}

        <form action={formAction} className="admin-form" style={{ display: 'grid', gap: 16 }}>
          <label>
            Email
            <input name="email" type="email" placeholder="admin@lumarestaurant.id" required autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
          </label>
          <button
            className="admin-btn admin-btn-primary"
            type="submit"
            disabled={pending}
            style={{ marginTop: 8, justifyContent: 'center', padding: '12px 18px' }}
          >
            {pending ? 'Masuk...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
