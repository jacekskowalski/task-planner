
import React from 'react';
import TaskComponent from "./task";

const SectionNew= ()=> {

    return(
        <div className="section__tasks">
         <div className="headline">Create</div>
        <TaskComponent />
        </div>
    );
}

export default SectionNew;