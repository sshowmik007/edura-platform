import { useState } from "react";
import { saveUser } from "../../../shared/learning/storage";
import LoginPage from "../../../pages/LoginPage";
import SignUpPage from "../../../pages/SignUpPage";

export function Auth({ onLogin }) {
	const [isSignup, setIsSignup] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [school, setSchool] = useState("");
	const [role, setRole] = useState("student");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const submit = (eventOrValues) => {
		if (eventOrValues?.preventDefault) {
			eventOrValues.preventDefault();
		}
		const values =
			eventOrValues && !eventOrValues.preventDefault
				? eventOrValues
				: { name, email, school, role };
		if (!values.email?.trim()) return;
		const u = {
			name: isSignup
				? values.name?.trim() || "Student"
				: values.email.trim().split("@")[0],
			email: values.email.trim(),
			school: values.school?.trim() || "",
			role: values.role || role,
		};
		saveUser(u);
		onLogin(u);
	};

	if (isSignup) {
			return (
				<SignUpPage
					defaultValues={{ name, email, school, role }}
					onSubmit={(values) => {
						setName(values.name);
						setEmail(values.email);
					setSchool(values.school);
					setRole(values.role);
					submit(values);
				}}
				onSwitchMode={() => setIsSignup(false)}
			/>
		);
	}

	return (
		<LoginPage
			email={email}
			password={password}
			remember={remember}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onRememberChange={setRemember}
			onSubmit={submit}
			onSwitchMode={() => setIsSignup(true)}
		/>
	);
}
