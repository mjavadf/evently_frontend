import { Grid } from '@mui/material'
import React from 'react'
import EventsList from '../components/EventsList'
import NavBar from '../components/NavBar'

function HomePage() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "none", md: "block" } }}
          md={2}
        >
          categories
        </Grid>
        <Grid item xs={12} md={10}>
          <EventsList />
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage