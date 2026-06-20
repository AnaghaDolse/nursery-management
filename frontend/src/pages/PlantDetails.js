import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const PlantDetails = () => {
 const { id } = useParams()
 const[plant, setPlant] = useState(null)

 useEffect(() => {
  const fetchPlant = async () => {
   try {
    const res = await axios.get(`http://localhost:5000/api//plants/${id}`)
    setPlant(res.data)
   } catch (error) {
    console.error(error)
   }
  }
  fetchPlant()
 },[id])

 if (!plant) return <p>Loading...</p>

  return (
    <div className="details">
    <img src={`http://localhost:5000${plant.image}`} alt={plant.name} />

    <h2>{plant.name}</h2>

    <p><strong>Category:</strong>{plant.category?.map(c =>c.name).join(',')}</p>
    <p><strong>Price:</strong>₹{plant.price}</p>
    <p><strong>Stock:</strong>{plant.stock}</p>
    <p>{plant.description}</p>
    </div>
  )
}

export default PlantDetails
