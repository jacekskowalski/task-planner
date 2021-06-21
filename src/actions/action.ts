export default function fetchDataSuccess(item: any) {
  return {
    type: "POST",
    payload: item
  };
}

export function putData(item:any){
  return {
    type: "PUT",
    payload: item
  };
}

export function getAllTasks(item: any) {
  return {
    type: "GET",
    payload: item
  };
}
export function fetchDataRequest() {
  return {
    type: "FETCH_DATA_REQUEST"
  };
}

export function deleteData(id:number) {
  return {
    type: "DELETE",
    payload: id
  }
}

