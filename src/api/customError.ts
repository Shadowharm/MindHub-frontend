import {AxiosError} from "axios";

export type CustomAxiosError = AxiosError<{message: string, errors: Record<string, string[]>, error?: string}>

export class CustomError extends Error {
    public errors: Record<string, string[]>;
    public statusCode: number | undefined;
    public message: string;
    public error: string;

    constructor(error: CustomAxiosError) {
        super(error?.response?.data?.message || 'Unknown error occurred');
        this.name = 'CustomError';

        this.statusCode = error?.response?.status;

        this.errors = error?.response?.data?.errors || {};

        this.message = error?.response?.data?.message || 'Unknown error occurred';

        this.error = error?.response?.data?.error || 'Unknown error occurred';
    }
}
