import { getAllTasks, fetchDataRequest} from "./action";

export default function taskGet(){
    return (dispatch: any) => {
        /*
      fetchDataRequest();
    fetch('http://localhost:7200/tasks', {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
       return  response.json();
    })
        .then(json => {
            dispatch(getAllTasks(json));
            })
            */
            fetch("https://www.googleapis.com/books/v1/volumes?q=html&maxResults=5",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                  }
            }).then(response=> {
              if (!response.ok) {
                throw Error(response.statusText);
            }
             return  response.json();
            })
    
            .then(json=>{ 
            let arr:any=[];
            let data= json.items.map((item:any, key:any)=> {
            let obj:any={};
                obj.id= item.id;
                obj.title =item.volumeInfo.title;
                obj.created= item.volumeInfo?.publisher;
                obj.etag= item.etag;
                if(key ===0 || key=== 1){
                obj.status= "ToDo";
                }else if(key=== 2 || key=== 3){
                  obj.status= "InProgress";
                }else{
                  obj.status="Done";
                }
                obj.description= item.selfLink;
                arr.push(obj);
                });
                dispatch(getAllTasks(arr));      
              }
            );
            
       }
}