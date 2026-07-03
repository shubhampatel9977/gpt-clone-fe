import { Input } from "@components";
import { Controller, useFormContext } from "react-hook-form";

const CreateProjectForm = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="flex flex-col gap-5">
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<Input
						{...field}
						label="Name*"
						placeholder="Enter Project Name"
						error={errors.email?.message as string}
					/>
				)}
			/>
		</div>
	);
};

export default CreateProjectForm;
