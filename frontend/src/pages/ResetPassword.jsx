import '../styles/Auth.css'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState(' ')
  const [confirmPassword, setConfirmPassword] = useState(' ')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDEfault()
  }
  return (
    <div className='forgot-container'>
      {/* Left Side */}
      <div className='forgot-left'>
        <div className='forgot-overlay'>
          <h1>Reset Password</h1>

          <p className='welcome-text'>Create a new secure password.</p>

          <p className='description'>
            Your new password should be strong and easy for you to remember.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='forgot-right'>
        <form className='forgot-form' onSubmit={handleSubmit}>
          <h2>Create New Password</h2>

          {/* New Password */}

          <div className='input-group'>
            <label>New Password</label>

            <div className='password-wrapper'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type='button'
                className='password-toggle'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className='input-group'>
            <label>Confirm Password</label>

            <div className='password-wrapper'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type='button'
                className='password-toggle'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button className='login-btn' type='submit'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
