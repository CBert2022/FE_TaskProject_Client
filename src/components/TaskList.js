import EditTask from "./EditTask";
import QuickEntryTask from "./QuickEntryTask";


function TaskListPage({getAllProjects, deleteTask, tasks, setTasks, getSpecificTasks, projectId }) {

  return (
    <div>

      {tasks?.map((task) => {
        return (
          <div key={task._id}>
            <div className="TaskCard card" /* key={task._id} onDragStart={(elem) => dragStart(elem, i)} onDragEnter={(elem) => dragEnter(elem, i)} onDragEnd={drop} draggable */>
              <h3>{task.title}</h3>
              <button onClick={() => deleteTask(task._id)}  > Delete </button>
            </div>
          </div>
        )
      })}

  <div>
    {projectId && <QuickEntryTask projectId={projectId} refresh={getAllProjects} />}
    {projectId && <EditTask projectId={projectId} refresh={getAllProjects} setTasks={setTasks} tasks={tasks} getSpecificTasks={getSpecificTasks} />}
  </div>

    </div>
  );
}

export default TaskListPage;

/*   const dragItem = useRef();
  const dragOverItem = useRef();
 
 const dragStart = (element, position) => {
  console.log("TASKS: ", props.project.tasks)
    dragItem.current = position;
    console.log("DRAG START ",element.target);
  };
  const dragEnter = (element, position) => {
    dragOverItem.current = position;
  };
 
  const drop = () => {
    let copyListItems = [...props.project.tasks]
    // const copyListItems = JSON.parse(JSON.stringify(projects));
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    props.setTasks(copyListItems);

  }; */

