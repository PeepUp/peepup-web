import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import type { IconSvgProps } from "@/types";

export type RandomIconProps = {
    icon?: React.FunctionComponentElement<IconSvgProps> | React.ReactElement;
    duration?: number;
    className?: string;
};

export default function RandomIcon(props: RandomIconProps) {
    const { icon, duration } = props;
    const listIcons = [
        Icons.FacePalmDoodleIcon,
        Icons.ComplexityPeopleDoodleIcon,
        Icons.RobotLoveDoodleIcon,
        Icons.JoyFigureDoodleIcon,
        Icons.GhostDoodleIcon,
    ];

    const [iconToShow, setIconToShow] = React.useState<
        React.FunctionComponentElement<IconSvgProps> | React.ReactElement
    >(
        icon ||
            React.createElement(listIcons[0], {
                className:
                    props.className ??
                    "w-24 h-24 dark:stroke-white/80 dark:fill-transparent opacity-50 rotate-12",
            } as IconSvgProps)
    );

    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * listIcons.length);

        const interval = setInterval(
            function () {
                setIconToShow(
                    React.createElement(listIcons[randomIndex], {
                        className:
                            "w-24 h-24 dark:stroke-white/80 dark:fill-transparent opacity-50 rotate-12",
                    } as IconSvgProps)
                );
            },
            duration || 1000 * 6
        );

        return () => clearInterval(interval);
    }, [iconToShow]);

    return (
        <UI.Card className="border-none bg-background p-2" shadow="lg" isPressable>
            {iconToShow ? iconToShow : null}
        </UI.Card>
    );
}
