import CreateTask from "../components/CreateTask";
import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function HomePage() {

  const {logOutUser} = useContext(AuthContext);

    return (
      <div>
          <CreateTask />
          <ImportantTask />
          <ScheduledTask />
          <button onClick={logOutUser}>Logout</button>
      </div>
    );
  }
   
  export default HomePage;