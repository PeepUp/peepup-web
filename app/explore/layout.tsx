import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import Link from "next/link";

import { BackwardButton } from "@/components/backward-button";
import { SimplePopulars } from "@/components/article/preview/simple-trending";

export default function Layout(props: { children: React.ReactNode }) {
  const sideBarDropDown = (
    <div className="my-auto hidden max-sm:flex max-sm:items-center max-sm:justify-center">
      <ul className="fixed left-4 top-1/3 z-50 flex flex-col items-center justify-center  space-y-2 rounded-lg py-2">
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
    <aside className="sticky top-32 h-screen basis-1/6 max-md:basis-1/5 max-sm:hidden max-sm:basis-10">
      <ul className="flex w-full flex-col space-y-2">
        {sideBarList.map((item, index) => (
          <li className="max-w-7/12 w-full" key={index}>
            <UI.Button
              size="sm"
              as={Link}
              rel="noopener"
              color="default"
              variant="light"
              className="text-md flex w-full flex-row items-center justify-start gap-3"
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
    <div className="sticky top-32 flex h-full basis-5/12 flex-col gap-2 max-lg:hidden">
      <SimplePopulars />
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
      <section className="flex min-h-full min-w-full flex-row space-x-3 max-lg:space-x-5 max-md:space-x-0 max-sm:flex-col">
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
    icons: <Icons.HomeIcon size={24} fill="none" />,
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
      <p className="select-none font-randrake text-[12px] font-medium">
        PeepUp
      </p>
    ),
    href: "/about-us",
  },
  {
    name: "FAQ",
    icons: <Icons.IdeaLampIcon size={24} className="fill-current" />,
    href: "/faq",
  },
];
