import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;