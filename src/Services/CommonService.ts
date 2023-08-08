
import { LogStatus } from '../Types/enums';

const log = (massage: string, status: LogStatus): void => {
    console.log(`${Date.now().toString()}: ${status} : massage:${massage} `)
}

export const CommonService = { log };
