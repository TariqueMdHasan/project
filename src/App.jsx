import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Bookfinder from './pages/bookfinder'
import EarthquakeVis from './pages/earthquakeVis'
import RecipeIdea from './pages/recipeIdea'
import WeatherNow from './pages/weatherNow'
import Landing from './pages/landing'
import Back from './pages/back'

function App() {

  return (
    <Router>
      <Back/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Bookfinder" element={<Bookfinder/>} />
        {/* <Route path="/Earthquake-Visualizer" element={<EarthquakeVis/>} />
        <Route path="/Recipe-Idea" element={<RecipeIdea/>} /> */}
        <Route path="/Weather-now" element={<WeatherNow/>} />
      </Routes>
    </Router>
  )
}

export default App
