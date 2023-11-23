import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface ToasterProps {
    invert?: boolean;
    theme?: "light" | "dark" | "system";
    position?: Position;
    hotkey?: string[];
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    gap?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    toastOptions?: ToastOptions;
    className?: string;
    style?: React.CSSProperties;
    offset?: string | number;
    dir?: "rtl" | "ltr" | "auto";
    loadingIcon?: React.ReactNode;
}
