import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ScrollReveal from '../components/ScrollReveal'

export default function AdminSignup() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Signup | Medelec Healthcare Solutions</title>
      </Helmet>

      <section className="min-h-screen bg-bg-platinum flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-center text-2xl font-bold text-primary-blue">
                Admin Signup
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-blue mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field w-full"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-blue mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-blue mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field w-full"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-teal w-full"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center text-xs text-text-muted">
              <p>Already have an account? <a href="/admin/login" className="text-surgical-teal hover:underline">Sign in</a></p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}