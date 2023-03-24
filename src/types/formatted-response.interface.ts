import { Status } from './status.enum';
import { Formatted } from './formatted.interface';
import { NotUndefined } from './not-undefined.type';

export interface FormattedResponse<T extends NotUndefined> extends Formatted<T> {
    status: Status.OK;
}
