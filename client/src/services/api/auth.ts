import axiosInstance from "./axiosInstance";
import { LOGIN_URL, REGISTER_URL, SEND_VERIFICATION_CODE_URL, VERIFY_OTP_URL, GET_USERS_URL } from "./endpoints";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
    SendCodeRequest,
    SendCodeResponse,
    User
} from "@/types/auth";

export const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
        LOGIN_URL,
        credentials
    );
    return data;
};

export const register = async (
    payload: RegisterRequest
): Promise<RegisterResponse> => {
    const { data } = await axiosInstance.post<RegisterResponse>(REGISTER_URL, payload);
    return data;
};

export const sendVerificationCode = async (
    payload: SendCodeRequest
): Promise<SendCodeResponse> => {
    const { data } = await axiosInstance.post<SendCodeResponse>(SEND_VERIFICATION_CODE_URL, payload);
    return data
};

export const verifyOtp = async (
    payload: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
    const { data } = await axiosInstance.post<VerifyOtpResponse>(VERIFY_OTP_URL, payload);
    return data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await axiosInstance.get<User[]>(GET_USERS_URL);
    return data;
}