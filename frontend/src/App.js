import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login.js'
import Navbar from './components/Navbar.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import UserPlantGrid from './components/UserPlantGrid.js'
import PlantDetails from './pages/PlantDetails.js'
import Favourites from './pages/Favourites.js'
import { fetchFavorites } from './features/plants/plantSlice.js'
import Cart from './pages/Cart.js'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import AdminOrders from './pages/AdminOrders.jsx'

function App() {
  const [editingPlant, setEditingPlant] = useState(null)
  const { token, user } = useSelector((state) => state.auth)

  const storedToken =
    localStorage.getItem('token') || sessionStorage.getItem('token')

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchFavorites())
  //   }
  // }, [dispatch, token])

  return (
    <Router>
      <div className='container'>
        <h1>Welcome to Jhaad Ugao !</h1>

        {token && <Navbar />}

        <Routes>
          {/*Login Route*/}
          <Route
            path='/'
            element={storedToken ? <Navigate to='/add-plant' /> : <Login />}
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

          {/*Protected Routes*/}
          <Route
            path='/add-plant'
            element={
              <ProtectedRoute>
                {user?.role === 'admin' ? (
                  <>
                    <AddPlant
                      editingPlant={editingPlant}
                      setEditingPlant={setEditingPlant}
                    />

                    <PlantList setEditingPlant={setEditingPlant} />
                  </>
                ) : (
                  <UserPlantGrid />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path='/plant/:id'
            element={
              <ProtectedRoute>
                <PlantDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/favorites'
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/checkout'
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          /><Route
          path='/admin/orders'
          element={
            <ProtectedRoute>
              {user?.role === 'admin' ? (
                <AdminOrders />
              ) : (
                <Navigate to='/add-plant' />
              )}
            </ProtectedRoute>
          }
        />
        </Routes>
        
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
