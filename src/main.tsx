import React from 'react';
import SectionNew from "./SectionNew";
import SectionToDo from "./SectionToDo";
import SectionInProgress from "./SectionInProgress";
import SectionDone from "./SectionDone";

export const Main =()=>{

        return (
            <div className="container">
                <div className="row">
                    <SectionNew />
                    <SectionToDo />
                    <SectionInProgress />
                    <SectionDone />
                </div>
            </div>
        );
    
}
