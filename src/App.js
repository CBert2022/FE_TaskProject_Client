import "./App.css";
import { Routes, Route } from "react-router-dom"; 
import CreateProject from "./components/CreateProject";
 
import Navbar from "./components/Navbar";     
import ProjectList from "./components/ProjectList";     
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>      
        <Route path="/" element={ <ProjectList /> } />
      </Routes>

    </div>
  );
}
 
export default App;