import React, { useState, useEffect, createRef } from 'react'
import {
  CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select
} from '@material-ui/core'

import { PlaceDetails } from '../../components'
import useStyles from './styles'


const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles()
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs((ref) => Array(places?.length).fill().map((_, i) => ref[i] || createRef()))
  }, [places])

  // console.log({ childClicked })
  const handleChange = (e) => {
    return setType(e.target.value)
  }

  const handleRating = (e) => {
    return setRating(e.target.value)
  }

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
      {
        isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size='5rem' />
          </div>
        ) : (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={handleChange}>
                <MenuItem value='restaurants'> Restaurants</MenuItem>
                {/* <MenuItem value='hotels'> Hotels</MenuItem>  disabled hotels api  */}
                <MenuItem value='attractions'>Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={handleRating}>
                <MenuItem value={0}> All</MenuItem>
                <MenuItem value={3}> Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
              {
                places?.map((place, i) => (
                  // For best practice create id, do not use the index, reason: you might delete an item
                  <Grid ref={elRefs[i]} key={i} item xs={12}>
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </>
        )}
    </div>
  )
}

export default List