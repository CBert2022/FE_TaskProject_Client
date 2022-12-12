import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function CreateTask(props) {
  console.log(props.tasks)

  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("")
  const [important, setImportant] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
console.log("props", props.projectId)
    const requestBody = { title, description, dueDate, projectId: props.projectId, important, createdBy: user._id };

    return axios
      .post(`${API_URL}/api/tasks`, requestBody)
      .then(() => {
        // Reset the state
        console.log("hello")
        setTitle("");
        setDescription("");
        setDueDate("");
        setImportant(false);
        props.refresh()
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

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default CreateTask;