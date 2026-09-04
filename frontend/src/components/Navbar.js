import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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

      {user?.role === 'admin' ? (
        <Link to='/admin/orders'>
          <button>📦 Manage Orders</button>
        </Link>
      ) : (
        <>
          <Link to={'/favorites'}>
            <button>❤ Favorites</button>
          </Link>
          <Link to={'/cart'}>
            <button>Cart 🛒</button>
          </Link>
          <Link to={'/orders'}>
            <button>📦 My Orders</button>
          </Link>
        </>
      )}

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
