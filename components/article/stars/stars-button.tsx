import { cn } from "@/lib/utils";
import * as UI from "@nextui-org/react";
import { Star } from "../list-post";

export function StarsButton() {
    return (
        <div>
            <UI.Avatar
                size="sm"
                className="max-w-5"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
        </div>
    );
}
