import React from "react";

export type Props = {
    params: {
        category: string;
    };
};

export default function Page(props: Props) {
    return (
        <section className="container w-full h-full justify-center items-center flex">
            <div>
                <h1>Page</h1>
                <p>Category: {props.params.category}</p>
            </div>
        </section>
    );
}
