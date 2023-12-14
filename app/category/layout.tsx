import * as UI from "@nextui-org/react";

import { BackwardButton } from "@/components/backward-button";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <header className="">
                <nav className="w-full">
                    <BackwardButton />
                </nav>
                <UI.Spacer y={6} />
            </header>
            <main>{props.children}</main>
        </>
    );
}
