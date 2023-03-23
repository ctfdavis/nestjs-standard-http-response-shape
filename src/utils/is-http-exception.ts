export function isHttpException(exception: any): boolean {
    return exception && exception.getStatus && exception.getResponse;
}
