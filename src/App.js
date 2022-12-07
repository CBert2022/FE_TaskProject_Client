import "./App.css";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";     
import ProjectList from "./components/ProjectList";     
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";  
import QuickEntryTask from "./components/QuickEntryTask"

 
function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskList/>
      <Routes>      
        <Route path="/" element={ <ProjectList /> } />
        <Route path="/" element={ <TaskList /> } />
      </Routes>
      <QuickEntryTask />
      <CreateTask />

    </div>
  );
}
 
export default App;