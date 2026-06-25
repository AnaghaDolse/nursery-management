import { useSelector } from 'react-redux'

const Favourites = () => {
  const { data } = useSelector((state) => state.plants)

  const faovuriteIds = JSON.parse(localStorage.getItem('favourites')) || []

  const favouritePlants = data.filter((plant) =>
    faovuriteIds.includes(plant._id),
  )
  return (
    <div>
      <h2>My Favourites</h2>

      {favouritePlants.length === 0 ? (
        <div>
          <h3>No Favorite Yet</h3>
          <p>Start exploring and save plants you love.</p>
        </div>
      ) : (
        favouritePlants.map((plant) => (
          <div key={plant._id}>
            <h3>{plant.name}</h3>
            <p>₹{plant.price}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Favourites
