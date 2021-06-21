import React, { Component } from 'react';
import { connect } from "react-redux";
import { ITask } from "./ITask";
import taskGet  from './actions/taskGet';
export class SectionDone extends Component<any, any>{

  
  render() {
    return (
      <div className="section__tasks">
        <div className="headline">Done</div>
        <div>
          {
            this.props.taskDone.filter((val:ITask)=> val.status === "Done")
            .map((item: ITask, key:any)=> (
            <div className="col task__box" key={item.id}>
            <div className="form-group margin-m">
            <label htmlFor={`title${item.id}`} className="form__label">Title:</label>
                <input type="text" id={`title${item.id}`} name="title" className="form__input form__input-title line-height-medium" value={item.title}
                    disabled={true} />
            </div>
           
            <div className="form-group margin-m font-medium">
              {/*
            <label htmlFor="dateSelected" className="form__label">Deadline:</label>
             <input type="date" id="dateSelected" name="deadline" className="line-height-medium"
             value={item.deadline.toString()} disabled={true}/>
              */}
                <label htmlFor="etag" className="form__label">ETag:</label>
             <input type="text" id="etag" name="etag" className="line-height-medium"
             value={item.etag} disabled={true}/>
            </div>
            <div className="form-group margin-m font-medium">
            <label htmlFor={`dateCreated${item.id}`} className="form__label">Created:</label>
             <input type="text" name="dateCreated" id={`dateCreated${item.id}`} className="line-height-medium padding-small"
             value={item.created} disabled={true} />
            </div>
            <div className="form-group margin-m font-medium">
            <span className="padding-small font-medium">Status: {item.status}</span>
            </div>
            
            <div className="form-group margin-m font-medium">
            <label htmlFor="desc" className="form__label" >Description:</label>
                <textarea id="desc" name="description" value={item.description}
                 className="form__input form__textarea line-height-medium" disabled={true}></textarea>
            </div>
        </div> )      
            )
              
          }
     
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    taskDone: state.data.val
  };
}
const mapDispatchToProps = (dispatch: any) => {
  return {
      getTasks: () => dispatch(taskGet()),
      dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionDone);