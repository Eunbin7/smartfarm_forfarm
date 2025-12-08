import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputSelect from "./pages/InputSelect";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlantMonitor from "./pages/PlantMonitor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputSelect />} />
        <Route path="/result" element={<Result />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/monitor" element={<PlantMonitor />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
