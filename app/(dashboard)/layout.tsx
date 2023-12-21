import { BackwardButton } from "@/components/backward-button";
import { NavTab } from "@/components/common/navtab";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <section>
      <header>
        <BackwardButton />
      </header>
      <section>{props.children}</section>
    </section>
  );
}
