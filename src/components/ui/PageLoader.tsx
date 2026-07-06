import { Loader } from "lucide-react";

const PageLoader = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<Loader className="animate-spin" color="#C0C0C1" />
		</div>
	);
};

export default PageLoader;
