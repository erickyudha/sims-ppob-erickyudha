import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getBalance, topUpBalance, createTransaction, getTransactionHistory } from './transactionAPI';

interface TransactionState {
    balance: number | null;
    transactions: Array<any>;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: TransactionState = {
    balance: null,
    transactions: [],
    status: 'idle',
    error: null,
};

export const fetchBalance = createAsyncThunk(
    'transaction/fetchBalance',
    async (token: string) => {
        const response = await getBalance(token);
        return response;
    }
);

export const topUp = createAsyncThunk(
    'transaction/topUp',
    async ({ token, amount }: { token: string; amount: number }) => {
        const response = await topUpBalance(token, amount);
        return response;
    }
);

export const createNewTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async ({ token, serviceCode }: { token: string; serviceCode: string }) => {
        const response = await createTransaction(token, serviceCode);
        return response;
    }
);

export const fetchTransactionHistory = createAsyncThunk(
    'transaction/fetchTransactionHistory',
    async ({ token, offset, limit }: { token: string; offset?: number; limit?: number }) => {
        const response = await getTransactionHistory(token, offset, limit);
        return response;
    }
);

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.status = 'idle';
                state.balance = action.payload.data.balance;
                state.error = null;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch balance';
            })
            .addCase(topUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.status = 'idle';
                state.balance = action.payload.data.balance;
                state.error = null;
            })
            .addCase(topUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to top up balance';
            })
            .addCase(createNewTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewTransaction.fulfilled, (state, action) => {
                state.status = 'idle';
                state.transactions = [action.payload.data, ...state.transactions];
                state.error = null;
            })
            .addCase(createNewTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create transaction';
            })
            .addCase(fetchTransactionHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
                state.status = 'idle';
                state.transactions = action.payload.data.records;
                state.error = null;
            })
            .addCase(fetchTransactionHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch transaction history';
            });
    },
});

export const selectBalance = (state: RootState) => state.transaction.balance;
export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectTransactionStatus = (state: RootState) => state.transaction.status;
export const selectTransactionError = (state: RootState) => state.transaction.error;

export default transactionSlice.reducer;
