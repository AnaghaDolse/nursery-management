import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='navbar'>
      <h3>🌱 Jhaad Ugao</h3>
      <div>
        <span>
          {user?.name}({user?.role})
        </span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
