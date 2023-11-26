import { AuthFormProvider } from "@/context/store/auth-form-store";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <AuthFormProvider>{props.children}</AuthFormProvider>
        </>
    );
}
