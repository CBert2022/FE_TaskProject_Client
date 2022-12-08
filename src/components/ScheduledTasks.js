import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ScheduledTask() {
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [isShown, setIsShown] = useState();
    console.log(isShown)

    const getAllScheduledTasks = () => {
        axios
          .get(`${API_URL}/api/tasks`)
          .then((response) => {
            console.log(response.data[0].dueDate)
            let scheduledTasks = response.data.filter((task)=>{
                return task.dueDate 
    
          })
          setScheduledTasks(scheduledTasks)})
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllScheduledTasks();
      }, [] );

      scheduledTasks && console.log(scheduledTasks)

      return (
        <>
        <div className="ScheduledCard card">
              <Link onClick={() => setIsShown(!isShown)}>
                Scheduled Tasks
              </Link>
        </div>
            {isShown && scheduledTasks.map((scheduledTask) => {
              return (
                <div className="TaskCard card" key={scheduledTask._id} >
                  <h3>SCHEDUELD:{scheduledTask.title}</h3>
                </div>
              );
            })}    
        </>
      );
}


export default ScheduledTask;