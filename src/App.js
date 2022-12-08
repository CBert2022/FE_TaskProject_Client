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
      <TaskList/>
       <Routes>      
        <Route path="/" element={ <ProjectList /> } />
      </Routes>
      <QuickEntryTask />
      <CreateTask />
      <ImportantTask />

    </div>
  );
}
 
export default App;