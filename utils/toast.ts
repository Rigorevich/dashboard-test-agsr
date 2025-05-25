import { ToastOptions, Zoom, toast } from 'react-toastify';

const defaultConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'light',
  transition: Zoom,
};

export const notify = {
  success: (message: string, config?: ToastOptions) =>
    toast.success(message, { ...defaultConfig, ...config }),
  error: (message: string, config?: ToastOptions) =>
    toast.error(message, { ...defaultConfig, ...config }),
  info: (message: string, config?: ToastOptions) =>
    toast.info(message, { ...defaultConfig, ...config }),
  warning: (message: string, config?: ToastOptions) =>
    toast.warning(message, { ...defaultConfig, ...config }),
};
