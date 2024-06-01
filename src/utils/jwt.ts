export const saveToken = (token: string) => {
	localStorage.setItem("accessToken", token)
}

export const getToken = () => {
	return localStorage.getItem("accessToken")
}

export const delToken = () => {
	localStorage.removeItem("accessToken")
}
