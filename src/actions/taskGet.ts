import { getAllTasks, fetchDataRequest} from "./action";

export default function taskGet(){
    return (dispatch: any) => {
  
      fetchDataRequest();
    fetch('http://localhost:7200/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
       return  response.json();
    })
        .then(json => {
            dispatch(getAllTasks(json));
            })

       }
}