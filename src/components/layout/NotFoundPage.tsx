import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components";
import { ROUTES } from "@src/routes/routes.constants";

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen items-center justify-center bg-black px-4">
			<div className="w-full max-w-md text-center">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gray bg-darkGray">
					<TriangleAlert
						size={40}
						className="text-white"
					/>
				</div>

				<p className="text-sm font-medium uppercase tracking-widest text-lightGray">
					404 Error
				</p>

				<h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
					Page Not Found
				</h1>

				<p className="mt-4 text-sm leading-6 text-lightGray sm:text-base">
					The page you're looking for doesn't exist or has been moved.
				</p>

				<Button
					onClick={() =>
						navigate(ROUTES.ROOT)
					}
					className="mt-8 w-full sm:w-auto"
				>
					Go to Home
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
