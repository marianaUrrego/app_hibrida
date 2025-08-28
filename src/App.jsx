import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DeviceFrame from "./components/DeviceFrame.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import AddExpenses from "./pages/AddExpenses.jsx";
import AddIncome from "./pages/AddIncome.jsx";
import Splash from "./pages/Splash.jsx";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <DeviceFrame>
        {!ready ? (
          <Splash />
        ) : (
          <Routes>
            {/*termina el splash, "/" redirige a /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/yo" element={<Profile />} />
            <Route path="/add/expense" element={<AddExpenses />} />
            <Route path="/add/income" element={<AddIncome />} />
          </Routes>
        )}
      </DeviceFrame>
    </BrowserRouter>
  );
}
