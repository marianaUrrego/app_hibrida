import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home.jsx'
import Splash from './pages/Splash.jsx'
import Profile from './pages/Profile.jsx'
import Search from './pages/Search.jsx'
import DeviceFrame from './components/DeviceFrame.jsx'

export default function App() {
  return (
    <DeviceFrame>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/yo" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </DeviceFrame>
  )
}
