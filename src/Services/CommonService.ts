
import { LogStatus } from "../Types/enums";

const log = (massage: string, status: LogStatus): void => {
    console.log(`${Date.now()}: ${status} : massage:${massage} `)
}


export const CommonService = { log };