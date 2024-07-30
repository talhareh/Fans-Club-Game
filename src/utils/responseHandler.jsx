import { toast } from 'react-toastify';


const handleResponse = (response) => {
    
    if (response.status === 200 || response.status === 201) {
         
        return response.data;
    } else {
        handleErrors(response.status);
    }
};

const handleErrors = (status) => {
    let message = '';
    let type = 'error';

    switch (status) {
        case 401:
            message = 'Unauthorized access.';
            break;
        case 404:
            message = 'Resource not found.';
            break;
        case 500:
            message = 'Internal server error.';
            break;
        case 503:
            message = 'Service unavailable.';
            break;
        default:
            message = 'An unknown error occurred.';
            break;
    }

    toast(message, { type });
};

export { handleResponse, handleErrors };
