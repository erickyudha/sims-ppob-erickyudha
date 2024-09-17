import config from './config';

const baseUrl = config.baseUrl;

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const getBanners = async () => {
    const response = await fetch(`${baseUrl}/banner`, {
        method: 'GET',
    });
    return handleResponse(response);
};

export const getServices = async (token: string) => {
    const response = await fetch(`${baseUrl}/services`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};
