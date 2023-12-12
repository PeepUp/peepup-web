export default class ErrorResponse extends Error implements CustomError {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    getError(): ErrorResponse {
        return this;
    }

    setError(error: string | Record<string, string>): void {
        this.message = typeof error === "string" ? error : JSON.stringify(error);
    }

    getStatus(): number {
        return this.status;
    }

    setStatus(status: number): void {
        this.status = status;
    }
}

export interface CustomError extends Error {
    status: number;

    getError(): ErrorResponse;
    setError(error: string | Record<string, string>): void;
    getStatus(): number;
    setStatus(status: number): void;
}
