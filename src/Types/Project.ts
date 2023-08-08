import { Status } from "./enums";

export class Project {
    id: string;
    name: string;
    customerCompany: string;
    date: Date;
    description: string;
    teams: string[];
    status: Status;
    isStartUp: boolean;
    isEmbeeddedSW: boolean;

    constructor(id: string, name: string, customerCompany: string, date: Date, description: string, teams: string[]
        , status: Status, isStartUp: boolean, isEmbeeddedSW: boolean) {
        this.id = id;
        this.name = name;
        this.customerCompany = customerCompany;
        this.description = description;
        this.date = date;
        this.teams = teams;
        this.status = status;
        this.isStartUp = isStartUp;
        this.isEmbeeddedSW = isEmbeeddedSW;
    }
}
export type ProjectHeader = Pick<Project, "name" | "customerCompany" | 'status' | 'id'>;