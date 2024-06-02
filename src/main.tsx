import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<Router>
			<ToastContainer limit={3}/>
			<App/>
		</Router>
	</QueryClientProvider>
);
