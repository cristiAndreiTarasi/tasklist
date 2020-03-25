import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: false,
    transition: Slide,
    pauseOnFocusLoss: false,
});

export default function (message, type, options = {}) {
    switch (type) {
        case type === 'success':
            toast.success(message);
            break;

        case type === 'error':
            toast.error(message);
            break;

        case type === 'info':
            toast.info(message);
            break;

        case type === 'warn':
            toast.warn(message);
            break;
            
        default:
            toast(message);
            break;
    }
}