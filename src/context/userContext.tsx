// AuthContext.js

import React, {createContext, useEffect, useState} from 'react';


interface authen {
	isLoggedIn: boolean
	user: any
}

interface props {
	children: React.ReactNode
}

export const userContext = createContext<authen>({
	isLoggedIn: false,
	user: null
});

const AuthProvider: React.FC<props> = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const user = JSON.parse(localStorage.getItem("user") ?? "")
	// useEffect(() => {
	//
	// 	if (user) {
	// 		setIsLoggedIn(true)
	// 	} else {
	// 		setIsLoggedIn(false)
	// 	}
	// }, []);


	return (
		<userContext.Provider value={{isLoggedIn, user}}>
			{children}
		</userContext.Provider>
	);
};

export default AuthProvider;
