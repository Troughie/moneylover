import "./App.css";
import {Route, Routes} from "react-router-dom";
import {route, routePath, routePathArray} from "./utils";
import {Home} from "./pages";


function App() {
	const routes: route[] = routePathArray()

	const {login, register} = routePath
	return (
		<Routes>
			<Route index element={<Home/>}/>
			<Route path={login.path} element={<login.element/>}/>
			<Route path={register.path} element={<register.element/>}/>
			{routes.map((el) => (
				<Route key={el.path} path={el.path} element={<el.element/>}/>
			))}
		</Routes>
	);
}

export default App;
