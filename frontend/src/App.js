import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputSelect from "./pages/InputSelect";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputSelect />} />
        <Route path="/result" element={<Result />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
