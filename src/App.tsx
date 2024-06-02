import "./App.css";
import {Route, Routes} from "react-router-dom";
import {route, routePath, routePathArray} from "./utils";
import {Home, PageNotFound} from "./pages";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";


function App() {
	const routes: route[] = routePathArray()

	const {login, register} = routePath

	return (
		<Routes>
			<Route index element={<Home/>}/>
			<Route path={login.path} element={
				<PublicRoute>
					<login.element/>
				</PublicRoute>
			}/>
			<Route path={register.path} element={
				<PublicRoute>
					<register.element/>
				</PublicRoute>
			}/>
			{routes.map((el) => (
				<Route key={el.path} path={el.path} element={
					<PrivateRoute>
						<el.element/>
					</PrivateRoute>
				}/>
			))}
			<Route path={`*`} element={<PageNotFound/>}/>
		</Routes>
	);
}

export default App;
