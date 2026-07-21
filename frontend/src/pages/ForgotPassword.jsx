import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState(' ')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(email)
  }
  return (
    <div className='forgot-container'>
      {/* Left Side */}
      <div className='forgot-left'>
        <div className='forgot-overlay'>
          <h1>Forgot Password</h1>

          <p className='forgot-welcome'>Don't worry, it happens.</p>

          <p className='forgot-description'>
            Enter your registered email address and we'll send you a password
            reset link.
          </p>
        </div>
      </div>
      {/* Right Side */}
      <div className='forgot-right'>
        <form className='forgot-form' onSubmit={handleSubmit}>
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
          <button className='login-btn' type='submit'>
            Send Reset Link
          </button>

          <p className='back-login'>
            Remember your password? <Link to='/'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
