
const initStateForTask = {
    val: [
        {   "id":"",
            "title": "",
            "created": "",
            "deadline": "",
            "status": "",
            "description": ""
        }
    ]
}
export default function taskReducer(state = initStateForTask, action: any) {
    switch(action.type){
    case "POST":
      return {...state, val: [...state.val,action.payload]};
    case "PUT":
  //    const filtered= state.val.filter((entity:any) =>entity.id !== action.payload.id) ; 
  //   return {...state, val:[...filtered, action.payload]};
     return {...state, val: state.val.map((entity:any)=> entity.id === action.payload.id ? action.payload : entity)}
    case "GET":
    return { ...state, val: action.payload };
    case "DELETE": 
        return { ...state,
            val: state.val.filter((entity: any) => entity.id !== action.payload)};
     default: 
      return {
            ...state
        }
    }

}