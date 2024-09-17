import config from './config';

const baseUrl = config.baseUrl;

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
    const response = await fetch(`${baseUrl}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            password,
        }),
    });
    return handleResponse(response);
};

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
};

export const getProfile = async (token: string) => {
    const response = await fetch(`${baseUrl}/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};

export const updateProfile = async (token: string, firstName: string, lastName: string) => {
    const response = await fetch(`${baseUrl}/profile/update`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
    });
    return handleResponse(response);
};

export const uploadProfileImage = async (token: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${baseUrl}/profile/image`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    return handleResponse(response);
};
