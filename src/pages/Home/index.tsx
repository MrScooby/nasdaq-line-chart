import React from 'react'
import {  Box, Container } from '@mui/material'
import { DatasetsSearchBar } from './components/DatasetsSearchBar'
import { DatasetLinearChart } from './components/DatasetLinearChart'

const HomeScreen = () => {
  return (
    <React.Fragment>
      <DatasetsSearchBar />
      <Container maxWidth="lg">
        <Box flex={1} mt={4}>
          <DatasetLinearChart />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default HomeScreen
