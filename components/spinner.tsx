import * as React from "react";
import * as UI from "@nextui-org/react";

interface Props extends UI.SpinnerProps {
    message?: string;
}

export default function LoadingSpinner(props: Props) {
    return (
        <>
            <UI.Spinner {...props}></UI.Spinner>{" "}
            <p>{props.message ?? "Wait a seconds"}</p>
        </>
    );
}
