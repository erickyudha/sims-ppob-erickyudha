// informationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getBanners, getServices } from './informationAPI';
import { useAppSelector } from './hooks';
import { selectToken } from './userSlice';

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

interface Banner {
    banner_name: string;
    banner_image: string;
    description: string;
}

interface InformationState {
    banners: Array<Banner>;
    services: Array<Service>;
    selectedService: Service | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: InformationState = {
    banners: [],
    services: [],
    selectedService: null,
    status: 'idle',
    error: null,
};

export const fetchBanners = createAsyncThunk(
    'information/fetchBanners',
    async (token: string) => {
        const response = await getBanners(token);
        return response;
    }
);

export const fetchServices = createAsyncThunk(
    'information/fetchServices',
    async (token: string) => {
        const response = await getServices(token);
        return response;
    }
);

const informationSlice = createSlice({
    name: 'information',
    initialState,
    reducers: {
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = 'idle';
                state.banners = action.payload.data;
                state.error = null;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch banners';
            })
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'idle';
                state.services = action.payload.data;
                state.error = null;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch services';
            });
    },
});

export const { setSelectedService } = informationSlice.actions;

export const selectBanners = (state: RootState) => state.information.banners;
export const selectServices = (state: RootState) => state.information.services;
export const selectSelectedService = (state: RootState) => state.information.selectedService;
export const selectInformationStatus = (state: RootState) => state.information.status;
export const selectInformationError = (state: RootState) => state.information.error;

export default informationSlice.reducer;
