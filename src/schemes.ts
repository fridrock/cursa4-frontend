interface DashboardDto {
    name: string,
    dashboardId?: string
}


interface RegisterDto{
    username: string
    password: string
    email: string
}

interface AuthDto{
    username: string
    password: string
}

interface AuthResponse {
    token: string
}
interface TaskDto{
    taskId?: string;
    dashboardId?: string;
    title: string;
    description: string;
    deadline: string;
    issued: string;
    priority: string;
    source:string;
    hoursSpent: number | string;
}


export type {RegisterDto ,AuthDto , AuthResponse, TaskDto, DashboardDto}