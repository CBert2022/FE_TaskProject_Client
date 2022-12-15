import { useState, useTransition } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";       
            
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
function CreateProject({getAllProjects}) {

  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, createdBy: user._id };
    return axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        getAllProjects()
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ProjectCard card">
      <h3>➤</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder='Add Prpject'
          onChange={(e) => setTitle(e.target.value)}
        />

         <>
      <button className="push" type="submit">Add</button>
    </> 

      </form>
    </div>
  );
}

export default CreateProject;