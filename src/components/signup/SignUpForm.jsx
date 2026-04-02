import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SignUpFields from "@/components/signup/SignUpFields";
import { CreateSignUpSchema } from "@/schemas/CreateSignUpSchema";

export default function SignUpForm({ defaultValues, onSubmit, onSwitchMode }) {
	const form = useForm({
		resolver: zodResolver(CreateSignUpSchema),
		defaultValues: {
			name: defaultValues?.name ?? "",
			email: defaultValues?.email ?? "",
			school: defaultValues?.school ?? "",
			role: defaultValues?.role ?? "student",
		},
	});

	const isBusy = form.formState.isSubmitting || form.formState.isValidating;

	return (
		<div className="w-full max-w-lg">
			<div className="mb-10 text-center lg:text-left">
				<h2 className="font-headline text-on-surface mb-2 text-3xl font-bold">
					Create your workspace
				</h2>
				<p className="text-on-surface-variant font-body">
					Join thousands of institutions curating financial literacy.
				</p>
			</div>

			<div className="bg-surface-container-high mb-10 flex w-full rounded-xl p-1">
				<button
					type="button"
					onClick={onSwitchMode}
					className="font-label flex-1 rounded-lg py-2 text-sm font-semibold text-slate-500 transition-all hover:text-on-surface"
				>
					Log In
				</button>
				<button
					type="button"
					className="font-label bg-surface-container-lowest text-primary ring-black/5 flex-1 rounded-lg py-2 text-sm font-semibold shadow-sm ring-1"
				>
					Sign Up
				</button>
			</div>

			<Form {...form}>
				<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					<SignUpFields form={form} />

					<div className="pt-4">
						<Button
							type="submit"
							disabled={isBusy}
							className="font-headline bg-primary-container text-on-primary-container shadow-primary/10 h-auto w-full rounded-xl py-4 font-bold transition-all hover:bg-secondary active:scale-[0.98]"
						>
							{isBusy ? <LoaderCircle className="animate-spin" /> : null}
							Create Account
							<span className="material-symbols-outlined text-sm">arrow_forward</span>
						</Button>
					</div>

					<p className="text-on-surface-variant font-body text-center text-xs">
						By signing up, you agree to the{" "}
						<a className="underline transition-colors hover:text-primary" href="#">
							Terms of Service
						</a>{" "}
						and{" "}
						<a className="underline transition-colors hover:text-primary" href="#">
							Privacy Policy
						</a>
						.
					</p>
				</form>
			</Form>
		</div>
	);
}
