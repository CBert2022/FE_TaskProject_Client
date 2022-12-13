import { useState, useParams } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";


const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function EditTask(props) {

   const { isLoggedIn, user } = useContext(AuthContext);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [dueDate, setDueDate] = useState("")
   const [important, setImportant] = useState(false)
   const [checked, setChecked] = useState(false)

  
   const handleSubmit = (e) => {
     e.preventDefault();
     const requestBody = { title, description, dueDate, projectId: props.projectId, important, createdBy: user._id, checked };
     

     return axios
       .put(`${API_URL}/api/tasks/${props.singleTask._id}/edit`, requestBody)
       .then(() => {
         // Reset the state
         console.log("hello")
         setTitle("");
         setDescription("");
         setDueDate("");
         setImportant(false);
         setChecked(false);
         props.getSpecificTasks(props.projectId)
       })
       .catch((error) => console.log(error));
   };
 

   return (
     <div className="AddTask form">
       <h3>Edit {props.singleTask.title}</h3>

       <form onSubmit={handleSubmit}>
         <label>Title:</label>
         <input
           type="text"
           name="title"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
         />

         <label>Description:</label>
         <textarea
           type="text"
           name="description"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
         />

         <label htmlFor="dueDate">Due date: </label>
         <input type="datetime-local"
           name="dueDate"
           value={dueDate}
           onChange={(e) => setDueDate(e.target.value)}
         />

         <label htmlFor="important">Important</label>
         <input type="checkbox"
           id="important"
           name="important"
           checked={important}
           onChange={() => setImportant(!important)}
         />

         <label htmlFor="checked">Done</label>
         <input type="checkbox"
           id="checked"
           name="checked"
           checked={checked}
           onChange={() => setImportant(!checked)}
         />


         <button type="submit" >Submit</button>
       </form>
     </div>
   );

}

export default EditTask;

