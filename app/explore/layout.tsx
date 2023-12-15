import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import Link from "next/link";

import { BackwardButton } from "@/components/backward-button";

export default function Layout(props: { children: React.ReactNode }) {
    const sideBarDropDown = (
        <div className="hidden max-sm:flex my-auto max-sm:justify-center max-sm:items-center">
            <ul className="flex flex-col items-center justify-center fixed top-1/3 left-4 z-50  rounded-lg space-y-2 py-2">
                {sideBarList.map((item, index) => (
                    <li className="" key={index}>
                        <UI.Button
                            size="sm"
                            as={Link}
                            rel="noopener"
                            color="default"
                            variant="light"
                            title={item.name}
                            href={item.href}
                            startContent={item.icons}
                            referrerPolicy="no-referrer"
                        ></UI.Button>
                    </li>
                ))}
            </ul>
        </div>
    );

    const sideBar = (
        <aside className="basis-1/6 max-md:basis-1/5 h-screen sticky top-32 max-sm:basis-10 max-sm:hidden">
            <ul className="flex flex-col space-y-2 w-full">
                {sideBarList.map((item, index) => (
                    <li className="max-w-7/12 w-full" key={index}>
                        <UI.Button
                            size="sm"
                            as={Link}
                            rel="noopener"
                            color="default"
                            variant="light"
                            className="text-md w-full flex flex-row justify-start items-center gap-3"
                            href={item.href}
                            startContent={item.icons}
                            referrerPolicy="no-referrer"
                        >
                            {item.name}
                        </UI.Button>
                    </li>
                ))}
            </ul>
        </aside>
    );

    const rightSideBar = (
        <div className="flex flex-col max-lg:hidden basis-5/12 h-screen sticky top-32 gap-2">
            <div className="rounded-md h-max w-full">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Populars</h1>
                </div>
                <div>
                    <ul className="w-full">
                        {new Array(4).fill(0).map((_, index) => (
                            <li
                                key={index}
                                className="text-md mb-2 w-full hover:bg-white/10 font-medium p-2 rounded-md"
                            >
                                <h3>
                                    Typescript is the best language for web development in
                                    2021
                                </h3>
                                <p>40 Comments</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="rounded-md h-full w-full">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Trandings</h1>
                    <UI.Spacer y={0.5} />
                    <p className="text-md font-bold p-2 bg-white/10 rounded-md w-min">
                        #Typescript
                    </p>
                </div>
                <ul className="w-full">
                    {new Array(4).fill(0).map((_, index) => (
                        <li
                            key={index}
                            className="text-md mb-2 w-full hover:bg-white/10 font-medium p-2 rounded-md"
                        >
                            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <>
            <header>
                <nav>
                    <BackwardButton />
                </nav>
                <UI.Spacer y={6} />
            </header>
            <section className="flex flex-row max-lg:space-x-5 space-x-3 max-md:space-x-0 min-w-full min-h-full max-sm:flex-col">
                {sideBar}
                {props.children}
                {rightSideBar}
            </section>
        </>
    );
}

type SideBarListData = {
    name: string;
    icons: React.ReactNode;
    href: string;
};

const sideBarList: SideBarListData[] = [
    {
        name: "Home",
        icons: <Icons.HomeIcon size={24} />,
        href: "/",
    },
    {
        name: "Profile",
        icons: <Icons.ProfileUserIcon size={24} fill="none" />,
        href: "/me",
    },
    {
        name: "About",
        icons: (
            <p className="font-randrake font-medium text-[12px] select-none">PeepUp</p>
        ),
        href: "/about",
    },
    {
        name: "FAQ",
        icons: <Icons.IdeaLampIcon size={24} className="fill-current" />,
        href: "/faq",
    },
];
