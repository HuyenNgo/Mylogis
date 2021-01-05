import swal from 'sweetalert'
import $ from 'jquery'

export default class Notifier {
    static current_effect = 'bounce'

    static showSuccessMessage = (message) => {
        swal({
            title: "Thành công!",
            text: message,
            icon: "success",
        });
    }

    static showErrorMessage = (message) => {
        swal({
            title: "Lỗi!",
            text: message,
            icon: "error",
        });
    }

    static showSuccessMessage = (message) => {
        swal({
            title: "Thông tin!",
            text: message,
            icon: "error",
        });
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