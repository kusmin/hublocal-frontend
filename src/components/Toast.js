import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000, 
  timerProgressBar: true,
});

export const showToast = (icon, title) => {
  Toast.fire({ icon, title });
};

export default Toast;