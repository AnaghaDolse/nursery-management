import '../styles/Auth.css'
import './ForgotPassword.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState(' ')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email,
      })

      toast.success('Password reset link sent to your email')
    } catch (error) {
      console.error(error)

      toast.error(error.response?.data?.message || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        {/* Left Side */}
        <div className='auth-left'>
          <div className='auth-overlay'>
            <h1 className='auth-title'>Forgot Password</h1>

            <p className='auth-subtitle'>Don't worry, it happens.</p>

            <p className='auth-description'>
              Enter your registered email address and we'll send you a password
              reset link.
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className='auth-right'>
          <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <div className='input-group'>
              <label>Email Address</label>
              <input
                type='email'
                placeholder='Enter your registered email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className='login-btn' type='submit' disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <p className='back-login'>
              Remember your password? <Link to='/'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
