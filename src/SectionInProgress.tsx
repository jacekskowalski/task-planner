
import React, { Component } from 'react';
import { connect } from "react-redux";
import { ITask, Status } from "./ITask";
import taskGet from './actions/taskGet';
import taskUpdate from './actions/taskUpdate';
import taskDelete from './actions/taskDelete';


export class SectionInProgress extends Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            isEditable: true,
            title: "",
            deadline: new Date().toISOString().replace('T', ' ').substring(0, 10),
            description: "",
            status: Status.INPROGRESS,
            key: ""
        }
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
        itask.deadline = arg3;
        itask.status = arg5;
        itask.description = arg6;

        if (arg2 === undefined || arg2.length < 5 || arg6 === undefined || 
            arg5=== undefined || arg6.length < 5 || arg3 === undefined) {
            return;
        }
        this.setState({
            title: "",
            deadline: "",
            status: Status.TODO,
            description:"",
            isEditable: !this.state.isEditable,
            key: ""
          });
        this.props.updateTask(itask);
        this.props.getTasks();
    }

    deleteTask = (id) => {
    
        this.setState({
            title: "",
            deadline: "",
            status: Status.INPROGRESS,
            key: "",
            description:""
        });
        this.props.deleteTaskById(id);
    }

    changeValue(name: any, e: any) {
        this.setState({
            [name]: e
        });
    }

    render() {
        return (
            <div className="section__tasks">
                <div className="headline">In progress</div>
                <div>
                    {
                        this.props.taskDone.filter((val: ITask) => val.status === "InProgress")
                            .map((item: ITask, key: any) => (
                                <div className="col task__box" key={key}>
                                    <div className="form-group margin-m">
                                    <label htmlFor={`title${item.id}`} className="form__label">Title:</label>
                    <input type="text" id={`title${item.id}`} name={`title${item.id}`} className="form__input form__input-title line-height-medium"
                      disabled={this.state.key !== item.id} value={this.state[item.title] || ''} placeholder={item.title}
                      onChange={(e) => this.changeValue(item.title, e.target.value)} required />
                                    </div>
                                    <div className="form-group margin-m font-medium">
            
                                        <label htmlFor={`deadline${item.id}`} className="form__label">Deadline:</label>
                                        <input type="text" id={`deadline${item.id}`} name={`deadline${item.id}`} className="line-height-medium dateSelected"
                                          disabled={this.state.isEditable } value={this.state[item.deadline] ||''} onChange={(e) => this.changeValue(item.deadline,e.target.value)}
                                          placeholder={item.deadline} onFocus={(e) => e.target.type = 'date'} />                  
                                    </div>
                                    <div className="form-group margin-m font-medium">
                                        <label htmlFor={`dateCreated${item.id}`} className="form__label">Created:</label>
                                        <input type="text" name="dateCreated" id={`dateCreated${item.id}`} className="line-height-medium padding-small"
                                            value={item.created} disabled={true} />
                                    </div>
                                    <div className="form-group margin-m font-medium">
                                        <label htmlFor="status-select" className="form__label" >Status:</label>
                                        <select name={`status${key}`} id="status-select" disabled={this.state.key !== item.id} defaultValue={this.state.status} onChange={(e) => this.changeValue(item.status, e.target.value)}>
                                            <option value="ToDo" >To Do</option>
                                            <option value="InProgress">In progress</option>
                                            <option value="Done" >Done</option>
                                        </select>
                                    </div>
                                    <div className="form-group margin-m font-medium">
                                        <label htmlFor={`desc${key}`} className="form__label" >Description:</label>
                                        <textarea id={`desc${key}`} name={`description${item.id}`} onChange={(e) => this.changeValue(item.description, e.target.value)} value={this.state[item.description] || ''} placeholder={item.description}
                                            disabled={this.state.key !== item.id} className="form__input form__textarea line-height-medium"></textarea>
                                    </div>
                                    <div className="form-group margin-m">
                                        {
                                            this.state.isEditable === false && this.state.key === item.id ?
                                                <button className="btn btn--green" onClick={() => this.saveInputs(item.id, this.state[item.title], this.state[item.deadline], item.created, this.state[item.status], this.state[item.description])}><i className="fas fa-save"></i></button> :
                                                <button className="btn btn--blue" onClick={() => this.editInputs(item.id)}><i className="fas fa-edit"></i></button>
                                        }
                                        <button className="btn btn--red" onClick={() => this.deleteTask(item.id)}><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>)
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
        updateTask: (val) => dispatch(taskUpdate(val)),
        deleteTaskById: (id) => dispatch(taskDelete(id)),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionInProgress);