import React from "react";
import moment from 'moment';

function FilteredScheduledTasks({allTasks, deleteTask, user } ) {

    return (
        <>
        <h3 className="taskFakeCard">Scheduled Tasks</h3>
            { allTasks && allTasks.map((task) => {
              if (task.dueDate && task.createdBy === user._id){
                return (
                  <div className="TaskCard animate__animated animate__fadeIn" key={task._id} >
                    <h3>{task.title}</h3>
                    <h3>{moment(task.dueDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h3>
                   <button className="push" onClick={(e)=>deleteTask(e, task._id)}  > Delete </button>
                  </div>
                );
              }
            })}

            <hr />
        </>
    )
}

export default FilteredScheduledTasks;