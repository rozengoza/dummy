export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    authToken: string;
    user: {
        id: string;
        email: string;
    }
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    userId: string;
}

export interface SendCodeRequest {
    email: string;
}

export interface SendCodeResponse {
    message: string;
}

export interface VerifyOtpRequest {
    email: string;
    code: string;
}

export interface VerifyOtpResponse {
    message: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}