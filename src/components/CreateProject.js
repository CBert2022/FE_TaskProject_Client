import { useState } from "react";
import axios from "axios";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
function CreateProject({refresh}) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title };
    axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        refresh()
      })
      .catch((error) => console.log(error));
  };
 
 
  return (
    <div className="AddProject">
      <h3>Add Project</h3>
 
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
 
export default CreateProject;