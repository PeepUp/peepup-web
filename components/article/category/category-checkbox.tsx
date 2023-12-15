import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv, CheckboxProps } from "@nextui-org/react";
import { CheckIcon } from "@/components/icons";

const checkbox = tv({
    slots: {
        base: "border-default hover:bg-default-200",
        content: "text-current text-xs font-semibold",
    },
    variants: {
        isSelected: {
            true: {
                base: "border-secondary bg-default hover:bg-primary-500 hover:border-primary-500",
                content: "text-primary-foreground pl-1",
            },
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            },
        },
    },
});

export const CustomCheckbox = (props: CheckboxProps) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...props,
    });

    const styles = checkbox({ isSelected, isFocusVisible });

    return (
        <label aria-label="checkbox" {...getBaseProps()}>
            <VisuallyHidden>
                <input aria-label="checkbox" {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                aria-checked={isSelected}
                aria-label="checkbox"
                color="primary"
                startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
                variant="faded"
                radius="md"
                {...getLabelProps()}
            >
                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </Chip>
        </label>
    );
};
