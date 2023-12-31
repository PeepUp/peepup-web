import { BackwardButton } from "@/components/backward-button";
import { AuthFormProvider } from "@/context/store/auth-form-store";
import * as UI from "@nextui-org/react";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <nav className="">
                    <BackwardButton />
                </nav>
                <UI.Spacer y={6} />
            </header>
            <AuthFormProvider>{props.children}</AuthFormProvider>
        </>
    );
}
