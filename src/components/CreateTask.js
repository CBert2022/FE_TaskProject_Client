import { useState } from "react";
import axios from "axios";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
function CreateTask({projectId, refresh}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState ("")
  const [important, setImportant] = useState(false)

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title, description, dueDate, projectId, important };

    axios
      .post(`${API_URL}/api/tasks`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setDueDate("")
        setImportant(false)
        refresh()
      })
      .catch((error) => console.log(error));
  };
 
 
  return (
    <div className="AddProject">
      <h3>Add Task</h3>
 
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

        <label for="dueDate">Due date: </label>
        <input type="datetime-local" 
        name="dueDate" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        />

        <label for="important">Important</label>
        <input type="checkbox" 
        id="important" 
        name="important" 
        checked={important}
        onChange={(e) => setImportant(!important)}
        />

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}
 
export default CreateTask;