import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

function App() {
	return (
		<Suspense
			// TODO: When loader component is available, replace "Loading..." with <Loader />
			fallback="Loading..."
		>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
