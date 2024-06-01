import {useMutation} from "@tanstack/react-query";
import type {UseMutationOptions} from "@tanstack/react-query";
import Swal from "sweetalert2";

interface Props extends UseMutationOptions<any, any, any, any> {
	errorToast?: string | null;
}

const useRequest = ({onSuccess, onError, ...props}: Props) => {
	const mutation = useMutation<unknown, unknown, any, unknown>({
		...props,
		onSuccess(res, variables: void, context: unknown) {
			onSuccess?.(res, variables, context);
		},
		onError(err: any, variables: void, context: unknown) {
			onError?.(err, variables, context);
			if (err && err.message) {
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: err?.message
				})
			}
		},
	});

	return mutation;
};

export default useRequest