import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
function QuickEntryTask({projectId, refresh}) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    
    const requestBody = { title, projectId, createdBy: user._id };
    axios
      .post(`${API_URL}/api/tasks`, requestBody)
      .then((response) => {
        // Reset the statr
        setTitle("");
        refresh()
      })
      .catch((error) => console.log(error));
  };
 
 
  return (
    <div className="AddProject">
      <h3>Add Task</h3>
 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default QuickEntryTask;