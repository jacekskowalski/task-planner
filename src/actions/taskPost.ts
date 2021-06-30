
import fetchDataSuccess from "./action";

    
export default function taskPost({title,created, deadline, status, description}) {
        return (dispatch: any) => {
   
        let itask: any= {};
        itask.title = title;
        itask.created = created;
        itask.deadline = deadline.toString();
        itask.status = status;
        itask.description = description;

       fetch('http://localhost:7200/tasks', {
            method: 'POST',
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
                dispatch(fetchDataSuccess(json));
                })
 
}
}
