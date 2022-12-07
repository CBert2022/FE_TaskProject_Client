import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function ImportantTask() {
    const [importantTasks, setimportantTasks] = useState([]);

    const getAllImTasks = () => {
        axios
          .get(`${API_URL}/api/tasks`)
          .then((response) => {
            console.log(response.data[0].important)
            let imporatantTasks = response.data.filter((task)=>{
                return task.important 
    
          })
            setimportantTasks(imporatantTasks)})
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllImTasks();
      }, [] );

    //   importantTasks && console.log(importantTasks)

      return (
        <div >
          
            {importantTasks.map((importantTask) => {
              return (
                <div className="ProjectCard card" key={importantTask._id} >
                <Link to={`/tasks/${importantTask._id}`}>

                  <h3>IMPORTANT:{importantTask.title}</h3>
                </Link>
                </div>
              );
            })}    
        </div>
  
      );
}


export default ImportantTask;