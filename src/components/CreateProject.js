import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
function CreateProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title, description };
    axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.log(error));
  };
 
 
  return (
    <div className="AddProject">
      <h3>Add Project</h3>
 
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
 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default CreateProject;