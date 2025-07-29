export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    authToken: string;
    user: {
        id: string;
        email: string;
        phoneNumber?: string;
        isEmailVerified: boolean;
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
    user: {
        id: string;
        email: string;
        phoneNumber?: string;
        isEmailVerified: boolean;
    }
}

export interface SendCodeRequest {
    email: string;
}

export interface SendCodeResponse {
    message: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpResponse {
    message: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}