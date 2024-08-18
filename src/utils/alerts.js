import { toast } from 'react-toastify';

export const showAlert = (type, message) => {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'danger') {
        toast.error(message);
    }
};
