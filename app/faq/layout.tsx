import { BackwardButton } from "@/components/backward-button";
import * as UI from "@nextui-org/react";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <nav>
                    <BackwardButton />
                </nav>
                <UI.Spacer y={6} />
            </header>
            <main>{props.children}</main>
        </>
    );
}
