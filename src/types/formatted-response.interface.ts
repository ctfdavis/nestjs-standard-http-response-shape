import { Status } from './status.enum';
import { Formatted } from './formatted.interface';

export interface FormattedResponse<T> extends Formatted<T> {
    status: Status.OK;
    payload: T | null;
}
