import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
function CreateTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState ("")

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title, description, dueDate };
    axios
      .post(`${API_URL}/api/tasks`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setDueDate("")
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

        <label for="date">Due date: </label>
        <input type="datetime-local" name="date" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default CreateTask;