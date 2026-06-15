import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.js'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [editingPlant, setEditingPlant] = useState(null)

  const token = localStorage.getItem('token')
  if (!token) {
    return <Login />
  }
  return (
    <Router>
      <div className='container'>
        <h1>Welcome to Jhaad Ugao !</h1>

        <Routes>
          {/*Login Route*/}
          <Route path='/login' element={<Login />} />

          {/*Protected Routes*/}
          <Route
            path='/add-plant'
            element={
              token ? (
                <>
                  <AddPlant
                    editingPlant={editingPlant}
                    setEditingPlant={setEditingPlant}
                  />
                  <PlantList setEditingPlant={setEditingPlant} />
                </>
              ) : (
                <Login />
              )
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
