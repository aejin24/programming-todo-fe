import { AxiosError } from "axios";
import { ErrorCode, ErrorMessage } from "constants/errorCode";

export default function failureHandler(e: unknown) {
    if (e instanceof AxiosError) {
        const status = e.response?.data.status;

        return new Error(ErrorMessage[status || ErrorCode.INTERNAL_SERVER_ERROR]);
    }

    return new Error(ErrorMessage[ErrorCode.INTERNAL_SERVER_ERROR]);
}
