import Swal from 'sweetalert2'
import $ from 'jquery'

export default class Notifier {
    static current_effect = 'bounce'

    static showSuccessMessage = (message) => {
        Swal.fire({
            title: "Thành công!",
            text: message,
            icon: "success",
        });
    }

    static showErrorMessage = (message) => {
        Swal.fire({
            title: "Lỗi!",
            text: message,
            icon: "error",
        });
    }

    static showConfirmation = (message, successCallbackFn) => {
        Swal.fire({
            title: "Xác nhận!",
            text: message,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: `Xác nhận lưu`,
            denyButtonText: `Hủy bỏ`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (successCallbackFn) successCallbackFn()
            }
        })
    }

    static showWaiting = () => {
        $("#waitingWrapper").removeClass("bg").addClass("bg")
        $("#waitingDiv").removeClass("loading-pouring").addClass("loading-pouring")
    }

    static hideWaiting = () => {
        $("#waitingWrapper").removeClass("bg")
        $("#waitingDiv").removeClass("loading-pouring")
    }



}