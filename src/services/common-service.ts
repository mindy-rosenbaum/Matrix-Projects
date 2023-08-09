
import { LogStatus } from '../types/enums';

const log = (massage: string, status: LogStatus): void => {
    const today = new Date();

    console.log(`${today.toLocaleString()}: ${LogStatus[status]} : massage:${massage} `)
}

export const CommonService = { log };
