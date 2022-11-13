import swal from 'sweetalert';

export function message(titleIn, textIn, iconIn, dangerModeIn) {
    swal({
        title: titleIn,
        text: textIn,
        icon: iconIn,
        dangerMode: dangerModeIn,
    })
}