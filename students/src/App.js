import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Student from "./components/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/:name" element={<Student />} />
    </Routes>
  );
}

export default App;
