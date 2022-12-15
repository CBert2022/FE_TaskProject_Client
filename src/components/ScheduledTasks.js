import { useState, useEffect } from "react";

function ScheduledTask({allTasks, deleteTask, getAllTasks, setSchedueldTaskIsShown ,schedueldTaskSetIsShown}) {


      useEffect(() => {
        getAllTasks();
      }, [] );

      return (
        <>
        <div className="ScheduledCard card">
              <h2 onClick={() => setSchedueldTaskIsShown(!schedueldTaskSetIsShown)}>
                Scheduled Tasks
              </h2>
        </div>

        </>
      );
}


export default ScheduledTask;
