import { BrowserRouter, Routes, Route } from "react-router";
import DeviceFrame from "./components/DeviceFrame.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import AddExpenses from "./pages/AddExpenses.jsx";
import AddIncome from "./pages/AddIncome.jsx";

export default function App() {
  return (
    <DeviceFrame>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/yo" element={<Profile />} />
          <Route path="/add/expense" element={<AddExpenses />} />
          <Route path="/add/income" element={<AddIncome />} />
        </Routes>
      </BrowserRouter>
    </DeviceFrame>
  );
}
