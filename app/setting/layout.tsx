import { BackwardButton } from "@/components/backward-button";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <BackwardButton />
      </header>
      <section className="flex flex-row max-lg:space-x-5 space-x-3 max-md:space-x-0 min-w-full min-h-full max-sm:flex-col">
        {props.children}
      </section>
    </>
  );
}
