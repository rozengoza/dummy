import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI } from '@/services/api/auth';
import type { LoginRequest, LoginResponse } from '@/types/auth';
import type { AxiosErrorResponse } from '@/types/api';

interface AuthState {
    user: LoginResponse['user'] | null;
    token: string | null;
    isLoading: boolean;
    isAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isAuth: false,
    error: null,
}

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginAPI(credentials);
        return response;
    } catch (err: unknown) {
        let message = 'Login failed';

        if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as AxiosErrorResponse).response?.data?.message === 'string'
        ) {
            message = (err as AxiosErrorResponse).response!.data!.message!;
        } else if (err instanceof Error) {
            message = err.message;
        }

        return rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null; 
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.authToken;
            state.isAuth = true;

        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Login Failed';
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;