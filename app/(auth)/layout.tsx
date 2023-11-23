import { AuthFormProvider } from "@/context/store";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <AuthFormProvider>{props.children}</AuthFormProvider>
        </>
    );
}
