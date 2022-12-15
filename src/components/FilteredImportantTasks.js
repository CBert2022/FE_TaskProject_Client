import React from "react";

function FilteredImportantTasks ({allTasks, deleteTask }){
    return  <>
        {allTasks && allTasks.map((task) => {
          if (task.important){
            return (
              <div className="TaskCard card" key={task._id} >
                {<h3>IMPORTANT:{task.title}</h3>}
                <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
              </div>
            );
          }
        })}    
    </>
}



export default FilteredImportantTasks;