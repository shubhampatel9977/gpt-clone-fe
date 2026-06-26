import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { PageLoader } from "./components";

function App() {
	return (
		<Suspense fallback={<PageLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
