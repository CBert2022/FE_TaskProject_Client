import "./App.css";
import { Routes, Route } from "react-router-dom"; 
import CreateProject from "./components/CreateProject";
 
import Navbar from "./components/Navbar";     
import ProjectList from "./components/ProjectList";     
import CreateTask from "./components/CreateTask";
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>      
        <Route path="/" element={ <ProjectList /> } />
      </Routes>
      <CreateTask />

    </div>
  );
}
 
export default App;