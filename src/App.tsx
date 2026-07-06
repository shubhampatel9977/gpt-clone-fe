import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { PageLoader } from "./components";
import { router } from "./routes";

function App() {
	return (
		<Suspense fallback={<PageLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
