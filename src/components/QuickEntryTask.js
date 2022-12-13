import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
function QuickEntryTask(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title, projectId: props.projectId, createdBy: user._id };
   
   return axios
      .post(`${API_URL}/api/tasks`, requestBody)
      .then(() => {
        // Reset the statr
        setTitle("");
        props.refresh(props.projectId)
      })
      .catch((error) => console.log(error));
  };
 
 
  return (
    <div className="TaskCard">
      <h3>+</h3>
 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Add Task'
        />
 
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

 
export default QuickEntryTask;