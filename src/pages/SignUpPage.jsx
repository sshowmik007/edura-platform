import SignUpForm from "@/components/signup/SignUpForm";
import SignUpHeader from "@/components/signup/SignUpHeader";
import SignUpHeroPanel from "@/components/signup/SignUpHeroPanel";

export default function SignUpPage({ defaultValues, onSubmit, onSwitchMode }) {
  return (
    <>
      <SignUpHeader />
      <main className=" min-h-screen lg:grid lg:grid-cols-2">
        <SignUpHeroPanel />
        <section className="bg-surface relative mt-12 flex items-center justify-center p-6 lg:p-12">
          <SignUpForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            onSwitchMode={onSwitchMode}
          />
        </section>
      </main>
    </>
  );
}
