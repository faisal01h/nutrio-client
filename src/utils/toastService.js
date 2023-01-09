import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastService {

    make(message, toastType, duration) {
        if(toastType === "error") {
            toast.error(message, {
                position: "top-right",
                autoClose: duration || 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if(toastType === "success") {
            toast.success(message, {
                position: "top-right",
                autoClose: duration || 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast(message, {
                position: "top-right",
                autoClose: duration || 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

export default new ToastService();