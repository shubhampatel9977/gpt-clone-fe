import { useGetUserData } from "@apis";

const HomePage = () => {

	const { data} = useGetUserData();

	console.log('data', data);

	return(
		<h1>Home Page</h1>
	);
};

export default HomePage;
