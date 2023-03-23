import { Status } from './status.enum';

export interface Formatted<T> {
    status: Status;
    messages: string[];
    payload: T | null;
    code: number;
}
