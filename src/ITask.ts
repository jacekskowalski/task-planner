export enum Status{
    TODO= "ToDo",
    INPROGRESS= "InProgress",
    DONE= "Done"
}

export interface ITask{
    id?: string;
    title: string;
    created: string;
    deadline?: string;
    status: Status;
    description: string;
}
