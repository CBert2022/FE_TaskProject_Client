import React, { useEffect } from "react";

function FilteredImportantTasks ({allTasks, deleteTask }){

   console.log("here!!")
    return  <>
            <h3 className="taskFakeCard">Important Tasks</h3>
        {allTasks && allTasks.map((task) => {
          if (task.important){
            return (
              <div className="TaskCard animate__animated animate__fadeIn" key={task._id} >
                {<h3>{task.title}</h3>}
                <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
              </div>
            );
          }
        })}    

        <hr />
    </>
}



export default FilteredImportantTasks;