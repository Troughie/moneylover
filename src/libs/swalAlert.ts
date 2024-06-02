import {typeAlert} from "../utils";
import Swal from "sweetalert2";


interface swalAlertProps {
	type: typeAlert,
	message: string
}

export const swalAlert = (props: swalAlertProps) => {
	const {type, message} = props

	switch (type) {
		case typeAlert.success:
			return Swal.fire({})

	}
}