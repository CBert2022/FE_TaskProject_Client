function TaskListPage(props) {
    
    return (
        <div>
             {props.isShown === props.project?._id && props.project?.tasks && props.project?.tasks.map((task) => {
                return (
                  <>
                  <div className="TaskCard card" key={task._id} >
                    <h3>{task.title}</h3>
                    <button onClick={()=>props.deleteTask(task._id)}  > Delete </button> 
                  </div>
                  
                
                </>
                )
              })}
        </div>
    );
  }
   
  export default TaskListPage;