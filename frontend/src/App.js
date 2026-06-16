import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [editingPlant, setEditingPlant] = useState(null)

  return (
    <Router>
      <div className='container'>
        <h1>Welcome to Jhaad Ugao !</h1>

        <Routes>
          {/*Login Route*/}
          <Route
            path='/'
            element={
              localStorage.getItem('token') ? (
                <Navigate to='/add-plant' />
              ) : (
                <Login />
              )
            }
          />

          {/*Protected Routes*/}
          <Route
            path='/add-plant'
            element={
              <ProtectedRoute>
                <>
                  <AddPlant
                    editingPlant={editingPlant}
                    setEditingPlant={setEditingPlant}
                  />
                  <PlantList setEditingPlant={setEditingPlant} />
                </>
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
