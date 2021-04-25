import React from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'

function App() {
  const routes = useRoutes();
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          {routes}
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App