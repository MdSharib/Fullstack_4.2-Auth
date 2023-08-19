import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Landing/Home";
import Pagenotfound from "./components/Pagenotfound";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
