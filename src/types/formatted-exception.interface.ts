import { Status } from './status.enum';
import { Formatted } from './formatted.interface';

export interface FormattedException<T> extends Formatted<T> {
    status: Status.ERROR;
}
