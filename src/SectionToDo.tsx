import React, { Component } from 'react';
import { connect } from "react-redux";
import { ITask, Status } from "./ITask";
import { deleteData, putData } from './actions/action';
import taskGet from './actions/taskGet';

export class SectionToDo extends Component<any, any>{

  constructor(props: any) {
    super(props);
    this.props.getTasks();
    this.state = {
      items: [],
      isEditable: true,
      title: "",
      deadline: new Date().toISOString().replace('T', ' ').substring(0, 10),
      status: Status.TODO,
      key: "",
      // description:""
      etag: ""
    }

  }
  changeValue(name: any, e: any) {
    this.setState({
      [name]: e
    });
  }
  editInputs(arg) {
    this.setState({
      isEditable: !this.state.isEditable,
      key: arg
    });
  }

  saveInputs(arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: string) {
    let itask: any = {} as ITask;
    itask.id = arg1;
    itask.title = arg2;
    itask.created = arg4;
    // itask.deadline = arg3;
    itask.etag = arg3;
    itask.status = arg5;
    itask.description = arg6;
    if (arg2 === undefined || arg2.length < 5 || arg6 === undefined || arg6.length < 5 || arg3 === undefined) {
     
    }

    this.props.updateTask(itask);
    this.setState({
      isEditable: !this.state.isEditable,
      key: ""
    });
  }

  deleteTask = (id) => {
    this.props.deleteTaskById(id);
    this.setState({
      title: "",
      deadline: new Date().toISOString().replace('T', ' ').substring(0, 10),
      status: Status.TODO,
      description: "",
      etag: "",
    });
  }

  render() {
    return (
      <div className="section__tasks">
        <div className="headline">To Do</div>
        <div>
          {
            this.props.taskDone.filter((val: ITask) => val.status === "ToDo")
              .map((item: ITask, key: any) =>(
                <div className="col task__box" key={key}>
                  <div className="form-group margin-m">
                    <label htmlFor={`title${key}`} className="form__label">Title:</label>
                    <input type="text" id={`title${key}`} name={`title${key}`} className="form__input form__input-title line-height-medium"
                      disabled={this.state.key !== item.id} value={this.state[item.title] || ''} placeholder={item.title}
                      onChange={(e) => this.changeValue(item.title, e.target.value)} required />
                  </div>
                  <div className="form-group margin-m font-medium">
                    {/*
            <label htmlFor="dateSelected" className="form__label">Deadline:</label>
             <input type="date" id="dateSelected" name="deadline" className="line-height-medium"
             disabled={this.state.isEditable } value={item.deadline.toString()} onChange={(e) => this.changeValue(this.style.deadline,e.target.value)}/>
              */}
                    <label htmlFor={`etag${item.id}`} className="form__label">ETag:</label>
                    <input type="text" id={`etag${item.id}`} name={`etag${item.id}`} className="line-height-medium" placeholder={item.etag}
                      disabled={this.state.key !== item.id} value={this.state[item.etag] || ''} onChange={(e) => this.changeValue(item.etag, e.target.value)} />
                  </div>
                  <div className="form-group margin-m font-medium">
                    <label htmlFor={`dateCreated${key}`} className="form__label">Created:</label>
                    <input type="text" name="dateCreated" id={`dateCreated${key}`} className="line-height-medium padding-small"
                      value={item.created} disabled={true} />
                  </div>
                  <div className="form-group margin-m font-medium">
                    <label htmlFor="status-select" className="form__label" >Status:</label>
                    <select id="status-select" disabled={this.state.key !== item.id} name={`status${key}`}
                      defaultValue={this.state.status || ''} onChange={(e) => this.changeValue(item.status, e.target.value)}>
                      <option value="ToDo" >To Do</option>
                      <option value="InProgress">In progress</option>
                      <option value="Done" >Done</option>
                    </select>
                  </div>
                  <div className="form-group margin-m font-medium">
                    <label htmlFor={`desc${key}`} className="form__label" >Description:</label>
                    <textarea id={`desc${key}`} disabled={this.state.key !== item.id} value={this.state[item.description] || ''} placeholder={item.description}
                      className="form__input form__textarea line-height-medium" onChange={(e) => this.changeValue(item.description, e.target.value)} name={`description${key}`}></textarea>
                  </div>
                  <div className="form-group margin-m">
                    {
                      this.state.isEditable === false && this.state.key === item.id ?
                        <button className="btn btn--green" onClick={() => this.saveInputs(item.id, this.state[item.title], this.state[item.etag], item.created, this.state[item.status], this.state[item.description])}><i className="fas fa-save"></i></button> :
                        <button className="btn btn--blue" onClick={() => this.editInputs(item.id)}><i className="fas fa-edit"></i></button>
                    }
                    <button className="btn btn--red" onClick={() => this.deleteTask(item.id)}><i className="fas fa-trash"></i></button>
                  </div>
                </div>)
              )
          }
        </div>
      </div>);
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
    updateTask: (val) => dispatch(putData(val)),
    deleteTaskById: (id) => dispatch(deleteData(id)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionToDo);