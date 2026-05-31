
import { useState } from 'react'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [editingPlant, setEditingPlant] = useState(null)
  return (
    <div className='container'>
      <h1>Welcome to Jhaad Ugao !</h1>
      <AddPlant editingPlant={editingPlant} setEditingPlant={setEditingPlant}/>
      <PlantList setEditingPlant={setEditingPlant}/>
      <ToastContainer />
    </div>
  )
}

export default App
