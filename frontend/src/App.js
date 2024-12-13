import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Test from "./pages/Test.jsx";
import React from "react";
import MyCloud from "./components/mycloud/MyCloud.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home ContentPage={MyCloud} />} />
        <Route path="/mycloud*" element={<Home ContentPage={MyCloud} />} />
        <Route path="/widgets" element={<Home ContentPage={Test} />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
