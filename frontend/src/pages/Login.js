import './Login.css'
import plantImage from '../assets/login_plant.jfif'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        },
      )
      const { token, user } = response.data
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', token)
      }

      dispatch(
        loginSuccess({
          token,
          user,
        }),
      )
      toast.success('Login successful')
      navigate('/add-plant')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-left'>
          <img src={plantImage} alt='Plants' className='login-image' />
          <div className='login-overlay'>
            <h1>Jhaad Ugao</h1>
            <p className='login-welcome-text'>Grow your dream garden with us</p>
            <p className='login-description'>
              Discover beautiful plants, manage your nursery, and bring nature
              closer to your home.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className='login-right'>
          <form className='login-form' onSubmit={handleLogin}>
            <h2>Welcome Back 👋</h2>
            <p className='subtitle'>Login to continue your gardening journey</p>

            <div className='input-group'>
              <label>Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='input-group'>
              <label>Password</label>
              <div className='password-wrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='login-options'>
              <label className='remember-me'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <Link to='/forgot-password' className='forgot-password'>Forgot Password?</Link>
            </div>

            <button className='login-btn' type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className='register-link'>
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
