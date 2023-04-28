import { Box, Container, Typography } from '@mui/material'

const ErrorPage = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={4} flex={1}>
        <Typography textAlign="center">This page doesn't exists</Typography>
      </Box>
    </Container>
  )
}

export default ErrorPage
