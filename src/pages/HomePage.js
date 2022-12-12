import CreateTask from "../components/CreateTask";
import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import ProjectListPage from "../components/ProjectList";

function HomePage() {

  const {logOutUser, user} = useContext(AuthContext);

    return (
      <div>
          <CreateTask />
          <ProjectListPage />
          <ImportantTask />
          <ScheduledTask />
          <button onClick={logOutUser}>Logout</button>
      </div>
    );
  }
   
  export default HomePage;