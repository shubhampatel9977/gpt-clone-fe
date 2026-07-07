import { PageLoader } from "@src/components";
import { useAccount } from "../api";
import {
	AboutCard,
	LogoutCard,
	ProfileCard,
	StatsCard,
	SubscriptionCard,
} from "../components";

const AccountPage = () => {
	const { data: accountData, isLoading, error } = useAccount();

	if (isLoading) {
		return <PageLoader />;
	}

	if (error || !accountData?.data) {
		return (
			<div className="flex h-full items-center justify-center">
				Failed to load account
			</div>
		);
	}

	const { profile, stats } = accountData.data;

	return (
		<div className="mx-auto w-full max-w-5xl px-4 py-3 md:py-6 lg:px-8">
			<div className="mb-4 md:mb-8">
				<h1 className="text-2xl md:text-3xl font-bold text-white">
					My Account
				</h1>

				<p className="mt-2 text-lightGray">
					View your account information, usage and application details.
				</p>
			</div>

			<div className="space-y-6">
				<ProfileCard profile={profile} />

				<StatsCard stats={stats} />

				<SubscriptionCard />

				<AboutCard />

				<LogoutCard />
			</div>
		</div>
	);
};

export default AccountPage;
