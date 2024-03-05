import { Grid } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Outlet />
      </Grid>
  )
}

export default Layout