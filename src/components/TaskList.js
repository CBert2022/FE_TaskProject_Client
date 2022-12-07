import { useState, useEffect } from "react";
import axios from "axios";
/* import CreateTask from "./CreateTask"; */
 
const API_URL = "http://localhost:5005";

function TaskListPage() {
    const [tasks, setTasks] = useState([]);
   
    const getAllTasks = () => {
      axios
        .get(`${API_URL}/api/tasks`)
        .then((response) => setTasks(response.data))
        .catch((error) => console.log(error));
    };
   
    
    useEffect(() => {
      getAllTasks();
    }, [] );
   
    tasks && console.log(tasks)
    
    return (
      <div className="ProjectListPage">
        
          {tasks && tasks.map((task) => {
            return (
              <div className="TaskCard card" key={task._id} >
                  <h3>{task.title}</h3>
              </div>
            );
          })}    
          <div>
{/*           <CreateTask /> */}
          </div> 
      </div>

    );
  }
   
  export default TaskListPage;


/*   

{project. tasks && project.tasks.map((task) => {
return (<div className="TaskCard card" key={task._id} >
<h3>{task.title}</h3>
<h4>{project._id}</h4>
</div>)
})} 

*/