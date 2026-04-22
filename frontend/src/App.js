
import { useState } from 'react'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'

function App() {
  const [editingPlant, setEditingPlant] = useState(null)
  return (
    <div className='App'>
      <h1>Welcome to Jhaad Ugao !</h1>
      <AddPlant editingPlant={editingPlant} setEditingPlant={setEditingPlant}/>
      <PlantList setEditingPlant={setEditingPlant}/>
    </div>
  )
}

export default App
