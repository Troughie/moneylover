export const saveToken = (token: string) => {
	localStorage.setItem("accessToken", token)
}

export const saveUser = (user: string) => {
	localStorage.setItem("user", user)
}

export const getToken = () => {
	return localStorage.getItem("accessToken")
}

export const delToken = () => {
	localStorage.removeItem("accessToken")
}
