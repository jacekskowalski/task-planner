import putData from "./action";


export default function taskUpdate(id:number,title:string, deadline:string,created:string, status:string,description:string){
    return (dispatch: any) => {
        let itask:any= {};
        itask.title = title;
        itask.created = created;
        itask.deadline = deadline;
        itask.status = status;
        itask.description = description;

    fetch(`http://localhost:7200/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itask)
    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    }).then(json => {
            dispatch(putData(json));
            })
       }
}