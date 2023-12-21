import { BackwardButton } from "@/components/backward-button";
import { EditorProvider } from "@/context/store/editor-store";

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
