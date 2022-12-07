import "./App.css";
import { Routes, Route } from "react-router-dom"; 
import CreateProject from "./components/CreateProject";
 
import Navbar from "./components/Navbar";     

import ProjectList from "./components/ProjectList";     
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";  

 
function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskList/>
      <Routes>      
        <Route path="/" element={ <ProjectList /> } />
        <Route path="/" element={ <TaskList /> } />
      </Routes>
      <CreateTask />

    </div>
  );
}
 
export default App;