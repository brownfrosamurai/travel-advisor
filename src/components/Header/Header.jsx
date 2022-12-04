import React, { useState } from 'react'

import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, InputBase, Typography, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles'

const Header = ({ setCoordinates }) => {
  const classes = useStyles();

  const [autoComplete, setAutoComplete] = useState()

  const handleOnLoad = ((autoC) => setAutoComplete(autoC))

  const handleOnPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()

    setCoordinates({lat, lng})
  }

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={handleOnLoad} onPlaceChanged={handleOnPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search...'
                className={`${classes.inputRoot}, ${classes.inputInput}`}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>

    </AppBar>
  )
}

export default Header