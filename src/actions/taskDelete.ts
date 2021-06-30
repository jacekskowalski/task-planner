import { deleteData } from "./action";

export default function taskDelete(id: number) {
    return (dispatch: any) => {

        fetch(`http://localhost:7200/tasks/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(json => {
                dispatch(deleteData(id));
            })
    }
}