import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData} from './api'

import { Header, List, Map } from './components'

const App = () => {
  const [places, setPlaces] = useState([])
  // const [weatherData, setWeatherData] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [bounds, setBounds] = useState({})
  const [coordinates, setCoordinates] = useState({})

  const [rating, setRating] = useState('')
  const [type, setType] = useState('restaurants')

  const [isLoading, setIsLoading] = useState(false)
  const [childClicked, setChildClicked] = useState(null)

  // Get loggein users current location 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, []);

  // Filter places after rating is selected 
  useEffect(() => {
    const filtered = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filtered)
  }, [rating])

  // Fetch places data and re-render map on location change
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)

      // getWeatherData(coordinates.lat, coordinates.lng).then(data => {
      //   console.log(weatherData)
      //   setWeatherData(data)})

      getPlacesData(type, bounds.sw, bounds.ne).then(data => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  }, [type, bounds])


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            // weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>

  )
}

export default App