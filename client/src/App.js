import "./App.css";
import Socket from "./Socket";
import { Routes, Route } from "react-router-dom";
import Socket2 from "./Socket2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Socket />} />
        <Route path="/socket2" element={<Socket2 />} />
      </Routes>
    </>
  );
}

export default App;
