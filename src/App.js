import "./App.css";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";     
import ProjectList from "./components/ProjectList";     
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";  
import QuickEntryTask from "./components/QuickEntryTask"
import ImportantTask from "./components/ImportantTasks";
 
function App() {
  return (
    <div className="App">
      <Navbar />

      <ImportantTask />
       <Routes>      
        <Route path="/" element={ <ProjectList /> } />
      </Routes>
      <CreateTask />

    </div>
  );
}
 
export default App;