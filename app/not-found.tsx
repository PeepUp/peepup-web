import { BackIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const text = cn([
  "text-center",
  "mt-1",
  "mb-2",
  "text-xl",
  "font-mono",
  "font-medium",
]);

const header = cn([
  "text-center",
  "mt-5",
  "mb-2",
  "text-8xl",
  "font-mono",
  "font-bold",
]);

export default function NotFound() {
  return (
    <div
      className={cn("w-full", "h-full", "flex", "flex-col", "justify-center")}
    >
      <h2 className={header}>404</h2>
      <div className="flex justify-center">
        <h2 className={text}>Could not find the resource!</h2>
      </div>
      <div className="flex justify-center m-4">
        <Button
          href="/"
          as={Link}
          color="secondary"
          variant="light"
          shallow
          startContent={<BackIcon />}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
