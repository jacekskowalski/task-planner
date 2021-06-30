
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Status } from "./ITask";
import taskGet  from './actions/taskGet';
import { render } from '@testing-library/react';
import taskPost from './actions/taskPost';

export class TaskComponent extends Component<any, any>{

    constructor(props:any){
     super(props);
 
     this.state={
        correctInput: true,
         created: new Date().toISOString().replace('T', ' ').substring(0, 10),
         title: "",
         deadline: "",
         description: "",
         status:""
     }
    }
  

    changeValue(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
   submit =(e) =>{
   const status:string= Status.TODO;
   const title:string= this.state.title;
   const created:string= this.state.created;
   const deadline:string= this.state.deadline;
   const description:string= this.state.description;

   if(title.length <5 || description.length < 5 || deadline === ""){
    e.preventDefault();
    this.setState({
        correctInput: false
    });
   }
 else{
    this.props.submitTask({title,created, deadline, status, description});
    this.setState({
        correctInput: true,
        title: "",
        deadline: "",
        created: new Date().toISOString().replace('T', ' ').substring(0, 10),
        description:"",
        status:""
    });
  
    }
  }
  render() {
    return (
        <div className="col">
            <div className="form-group margin-m">
                <label htmlFor="title" className="form__label">Title:</label>
                <input type="text" id="title" name="title" className="form__input form__input-title line-height-medium" value={this.state.title}
                    onChange={(e) => this.changeValue(e)} required placeholder="Min. 5 characters" minLength={5}/>
            </div>
            <div className="form-group margin-m">
                <label htmlFor="dateSelected" className="form__label">Deadline:</label>
                <input type="text" id="dateSelected" name="deadline" className="line-height-medium dateSelected" onFocus={(e) => e.target.type = 'date'}
                    value={this.state.deadline.toString()} onChange={(e) => this.changeValue(e)} placeholder="yyyy-mm-dd"/>             
            </div>
            <div className="form-group margin-m">
                <label htmlFor="dateCreated" className="form__label">Created:</label>
                <input type="text" name="dateCreated" id="dateCreated" className="line-height-medium padding-small"
                    value={this.state.created} disabled={true} />
            </div>
            <div className="form-group margin-m">
                <label htmlFor="status-select" className="form__label" >Status:</label>
                <select name="status" id="status-select" value={this.state.status} onChange={(e) => this.changeValue(e)}>
                    <option value="todo" >To Do</option>
                </select>
            </div>
            <div className="form-group margin-m">
                <label htmlFor="desc" className="form__label" >Description:</label>
                <textarea id="desc" name="description" value={this.state.description} placeholder="Min. 5 characters"
                 onChange={(e) => this.changeValue(e)} minLength={5} className="form__input form__textarea line-height-medium"></textarea>
            </div>
            <div className="form-group margin-m">
                <button className="btn btn--green" onClick={this.submit}><i className="fas fa-save"></i></button>
           {
               this.state.correctInput === false &&
               <span className="errorText padding-small text--error">Incorrect data</span>
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
       submitTask: (val) => dispatch(taskPost(val)),
        dispatch
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskComponent);