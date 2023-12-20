"use client";

import { ForwardIcon } from "@/components/icons";
import * as UI from "@nextui-org/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { MyInput } from "@/components/input";
import { cn } from "@/lib/utils";
import { ProfileUploader } from "@/components/settings/profile/profile-upload";

type ProfileDataForm = {
    fullName: string;
};

export default function Page() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    const [link3, setLink3] = useState("");
    const [formData, setFormData] = useState<ProfileDataForm>({} as ProfileDataForm);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ fullName, username, phoneNumber, address });
    };

    return (
        <section>
            <div className="mb-6 mt-8 text-3xl font-bold">Profile</div>
            <form onSubmit={handleSubmit} id="edit-user">
                <div
                    className={cn([
                        "flex",
                        "gap-8 py-4",
                        "max-md:py-18",
                        "max-sm:flex-col",
                    ])}
                >
                    <div className={cn(["flex flex-col", "w-full"])}>
                        <div className="flex flex-col w-4/5">
                            <span className="pb-1">Full Name</span>
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type="text"
                                value={formData.fullName}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, fullName: value })
                                }
                            />
                        </div>
                        <p className="text-sm pt-1 pb-6 font-normal">
                            Your full name helps personalize your experience. It’s not
                            public without consent. You can change it anytime.
                        </p>
                        <div className="flex flex-col w-4/5">
                            <span className="pb-1">Username</span>
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type="text"
                                value={username}
                                onValueChange={setUsername}
                            />
                        </div>
                        <p className="text-sm pt-1 pb-6 font-normal">
                            Your name may appear around PeepUP where you post or are
                            mentioned. You can remove it at any time.
                        </p>
                        <div className="flex flex-col w-4/5">
                            <span className="pb-1">Phone Number</span>
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required
                                value={phoneNumber}
                                onValueChange={setPhoneNumber}
                            />
                        </div>
                        <p className="text-sm pt-1 pb-6 font-normal">
                            Your phone number may be used for account verification and to
                            assist with account access. It will not be publicly displayed
                            or shared. You can update or remove it at any time.
                        </p>
                        <div className="flex flex-col">
                            <span className="pb-1">Address</span>
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type="text"
                                value={address}
                                onValueChange={setAddress}
                            />
                        </div>
                        <p className="text-sm pt-1 pb-6 font-normal">
                            Your address helps provide local info and improve your
                            experience. It’s private and not shared. You can change it
                            anytime.
                        </p>
                        <div className="pb-4">
                            <label>Social accounts</label>
                            <MyInput
                                className="py-3"
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type={"text"}
                                value={link1}
                                placeholder="Link to social profile"
                                onValueChange={setLink1}
                            />
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type={"text"}
                                value={link2}
                                placeholder="Link to social profile"
                                onValueChange={setLink2}
                            />
                            <MyInput
                                className="py-3"
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type={"text"}
                                value={link3}
                                placeholder="Link to social profile"
                                onValueChange={setLink3}
                            />
                        </div>

                        <div>
                            <UI.Button
                                type="submit"
                                className="w-40 py-4 mx-auto font-medium"
                                endContent={
                                    <ForwardIcon className="dark:fill-white/60" />
                                }
                                as={Link}
                                href=""
                            >
                                Update Profile
                            </UI.Button>
                        </div>
                    </div>

                    <div
                        className={cn([
                            "flex flex-col",
                            "gap-x-8",
                            "w-3/4 min-h-max",
                            "max-sm:order-first",
                        ])}
                    >
                        <div className="pb-2">
                            <label>Profile Picture</label>
                        </div>
                        <ProfileUploader />
                    </div>
                </div>
            </form>
        </section>
    );
}
