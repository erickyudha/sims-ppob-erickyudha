import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { registerUser, loginUser, getProfile, updateProfile, uploadProfileImage } from './userAPI';

interface UserState {
    user: {
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
    } | null;
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

export const register = createAsyncThunk(
    'user/register',
    async ({ email, firstName, lastName, password }: { email: string; firstName: string; lastName: string; password: string }) => {
        const response = await registerUser(email, firstName, lastName, password);
        return response;
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await loginUser(email, password);
        return response;
    }
);

export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (token: string) => {
        const response = await getProfile(token);
        return response;
    }
);

export const updateProfileData = createAsyncThunk(
    'user/updateProfile',
    async ({ token, firstName, lastName }: { token: string; firstName: string; lastName: string }) => {
        const response = await updateProfile(token, firstName, lastName);
        return response;
    }
);

export const uploadProfilePicture = createAsyncThunk(
    'user/uploadProfileImage',
    async ({ token, file }: { token: string; file: File }) => {
        const response = await uploadProfileImage(token, file);
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('userState');
        },
        loadUserState: (state) => {
            const savedState = localStorage.getItem('userState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                state.user = parsedState.user;
                state.token = parsedState.token;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to register';
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload.data.token;
                state.user = action.payload.data.user; // Assuming response contains user data
                state.error = null;
                localStorage.setItem('userState', JSON.stringify({
                    user: state.user,
                    token: state.token,
                }));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to login';
            })
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = {
                    email: action.payload.data.email,
                    firstName: action.payload.data.first_name,
                    lastName: action.payload.data.last_name,
                    profileImage: action.payload.data.profile_image,
                };
                state.error = null;
                localStorage.setItem('userState', JSON.stringify({
                    user: state.user,
                    token: state.token,
                }));
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch profile';
            })
            .addCase(updateProfileData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = {
                    ...state.user!,
                    firstName: action.payload.data.first_name,
                    lastName: action.payload.data.last_name,
                };
                state.error = null;
                localStorage.setItem('userState', JSON.stringify({
                    user: state.user,
                    token: state.token,
                }));
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update profile';
            })
            .addCase(uploadProfilePicture.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadProfilePicture.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = {
                    ...state.user!,
                    profileImage: action.payload.data.profile_image,
                };
                state.error = null;
                localStorage.setItem('userState', JSON.stringify({
                    user: state.user,
                    token: state.token,
                }));
            })
            .addCase(uploadProfilePicture.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to upload profile image';
            });
    },
});

export const { logout, loadUserState } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectStatus = (state: RootState) => state.user.status;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
