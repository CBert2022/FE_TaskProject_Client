import "./App.css";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";     
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>      
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={ <IsPrivate> <HomePage /> </IsPrivate> } />
      </Routes>
    </div>
  );
}
 
export default App;