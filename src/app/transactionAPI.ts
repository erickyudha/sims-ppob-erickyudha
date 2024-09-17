import config from './config';

const baseUrl = config.baseUrl;

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const getBalance = async (token: string) => {
    const response = await fetch(`${baseUrl}/balance`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};

export const topUpBalance = async (token: string, amount: number) => {
    const response = await fetch(`${baseUrl}/topup`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ top_up_amount: amount }),
    });
    return handleResponse(response);
};

export const createTransaction = async (token: string, serviceCode: string) => {
    const response = await fetch(`${baseUrl}/transaction`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service_code: serviceCode }),
    });
    return handleResponse(response);
};

export const getTransactionHistory = async (token: string, offset = 0, limit = 10) => {
    const response = await fetch(`${baseUrl}/transaction/history?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};
