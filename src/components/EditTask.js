import { useState, useParams } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import moment from "moment"
import 'animate.css';



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"

function EditTask(props) {

    const { isLoggedIn, user } = useContext(AuthContext);
    const [title, setTitle] = useState(props.singleTask.title);
    const [description, setDescription] = useState(props.singleTask.description);
    const [dueDate, setDueDate] = useState(props.singleTask.dueDate)
    const [important, setImportant] = useState(props.singleTask.important)
    const [checked, setChecked] = useState(false)

    title && console.log("title", title)
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
                props.setSingleTask("");
                props.getAllTasks()
                props.getSpecificTasks(props.projectId)
            })
            .catch((error) => console.log(error));
    };

    return (
        <div id="edittasktransition" className="animate__animated animate__fadeIn">
            <div className="AddProject">
                {props.singleTask &&
                    <div>

                        <h2>{props.singleTask.title} Details</h2>

                        <h2></h2>

                        {props.singleTask.description &&<h3>{props.singleTask.description}</h3>}

                       {props.singleTask.dueDate && <>
                       <h3>Due:</h3>
                       <h3>{moment(props.singleTask.dueDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h3>
                       </>}

                       {props.singleTask.important === true && <h3>Important ★</h3>}

                    </div>
                }
            </div>
            <div className="AddProject">
                {props.singleTask &&
                    <form onSubmit={handleSubmit}>
                        <h2>Edit Details</h2>
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
                }
            </div>
        </div>
    );
}

export default EditTask;

