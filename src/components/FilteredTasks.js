import React from "react";
import moment from 'moment';



function FilteredTasks({allTasks, deleteTask } ) {

 console.log(allTasks)

    return (
        <>

            { allTasks && allTasks.map((task) => {
          
              if (task.dueDate){
                return (
                  <div className="TaskCard card" key={task._id} >
                    <h3>{task.title}</h3>
                    <h3>{moment(task.dueDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h3>
                   <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}
         
        </>
    )



}

export default FilteredTasks;