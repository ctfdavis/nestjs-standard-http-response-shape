import { Status } from './status.enum';
import { NotUndefined } from './not-undefined.type';

export interface Formatted<T extends NotUndefined = NotUndefined> {
    status: Status;
    messages: string[];
    payload: T;
    code: number;
}
