import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function ImportantTask({allProjects}) {
    const [importantTasks, setimportantTasks] = useState([]);
    const [isShown, setIsShown] = useState(false);
    console.log(isShown)

    const getAllImTasks = () => {

      allProjects.map((project)=>{
       const x = project.tasks.filter((task)=> {
        return task.important 
        })
        setimportantTasks(x)

      })
      };

      const deleteTask = (id) => {
        console.log("delete called")
        axios
          .post(`${API_URL}/api/tasks/${id}/delete`)
          .then(() => getAllImTasks())
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllImTasks();
      },[allProjects]);

      importantTasks && console.log(importantTasks)

      return (
        <>
        <div className="ImportantCard card">
              <Link onClick={() => setIsShown(!isShown)}>
                Important Tasks
              </Link>
        </div>
            {isShown && importantTasks.map((importantTask) => {
              return (
                <div className="TaskCard card" key={importantTask._id} >
                  <h3>IMPORTANT:{importantTask.title}</h3>
                  <button onClick={()=>deleteTask(importantTask._id)}  > Delete </button>
                </div>
              );
            })}    
        </>
      );
}


export default ImportantTask;