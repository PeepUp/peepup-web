"use client";

import { useGlobalContext } from "@/context/store/global";
import * as UI from "@nextui-org/react";

export type Props = {
    name: string;
    description: string;
    avatar: string;
    username: string;
    isFollowed: boolean;
    created_at: string;
};

export function AuthorAvatarPopover(props: Props) {
    const { data } = useGlobalContext();

    const avatarPopoverCard = (
        <UI.Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <UI.CardHeader className="justify-between">
                <div className="flex gap-3">
                    <UI.Avatar
                        size="md"
                        src={data && data.identity ? data.identity.avatar : ""}
                        color="default"
                        isBordered
                    />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-current">
                            {data && data.identity ? data.identity.fullName : ""}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                            @{data && data.identity ? data.identity.username : ""}
                        </h5>
                    </div>
                </div>
                <UI.Button
                    className={
                        props.isFollowed
                            ? "bg-transparent text-foreground border-default-200"
                            : ""
                    }
                    color="default"
                    radius="full"
                    size="sm"
                    variant={props.isFollowed ? "bordered" : "solid"}
                >
                    View
                </UI.Button>
            </UI.CardHeader>
            <UI.CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">{props.description}</p>
            </UI.CardBody>
            <UI.CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">4</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">97.1K</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
            </UI.CardFooter>
        </UI.Card>
    );

    return (
        <UI.Popover triggerScaleOnOpen={false}>
            <UI.PopoverTrigger>
                <UI.User
                    name={data && data.identity ? data.identity.fullName : ""}
                    description={props.created_at}
                    avatarProps={{
                        src:
                            data && data.identity
                                ? data.identity.avatar
                                : "http://localhost:3000/assets/images/milad.jpg",
                        alt: "avatar",
                        color: "primary",
                        className: "w-8 h-8 text-xs",
                    }}
                    className="cursor-pointer"
                    classNames={{
                        name: "text-xs font-semibold",
                    }}
                />
            </UI.PopoverTrigger>
            <UI.PopoverContent>{avatarPopoverCard}</UI.PopoverContent>
        </UI.Popover>
    );
}
