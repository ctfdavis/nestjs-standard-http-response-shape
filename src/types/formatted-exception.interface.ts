import { Status } from './status.enum';
import { Formatted } from './formatted.interface';

export interface FormattedException extends Formatted {
    status: Status.ERROR;
}
