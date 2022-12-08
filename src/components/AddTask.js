import { useState, useEffect } from "react";
import axios from "axios";
import ProjectListPage from "./ProjectList";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function AddTask (props) {
    const [title, setTitle]= useState("")
    const [description, setDescription]= useState("")
    const [dueDate, setDueDate]= useState(0)
}

export default AddTask