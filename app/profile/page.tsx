"use client";

import { ForwardIcon } from "@/components/icons";
import * as UI from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("/path/to/default/avatar.jpg");
    const [socialMedia, setSocialMedia] = useState("");

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="px-2 font-medium max-sm:mb-4 md:px-20">
            <div className="mb-10 text-center text-3xl font-bold">Profile</div>

            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 flex-col">
                <div className="w-full">
                    <div className="flex flex-col w-full">
                        <span className="font-medium pb-1">Full Name</span>
                        <UI.Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col w-full">
                        <span className="font-medium pb-1">Username</span>
                        <UI.Input
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <span className="font-medium pb-1">Email</span>
                    <UI.Input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    Email Verified:
                    {emailVerified ? "Yes" : "No"}
                    {!emailVerified && (
                        <UI.Button onClick={() => setEmailVerified(true)}>
                            Verify Email
                        </UI.Button>
                    )}
                </div>
                <div className="w-full">
                    <div className="flex flex-col w-full">
                        <span className="font-medium pb-1">Address</span>
                        <UI.Input type="text" />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col w-full">
                        <span className="font-medium pb-1">Phone Number</span>
                        <UI.Input
                            type="email"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <UI.Button
                        className="w-40 py-4 mx-auto font-medium"
                        endContent={<ForwardIcon className="dark:fill-white/60" />}
                        as={Link}
                        href=""
                    >
                        Update Profile
                    </UI.Button>
                </div>
            </div>
        </div>
    );
}
const ProfileSettings = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("/path/to/default/avatar.jpg");
    const [socialMedia, setSocialMedia] = useState("");

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <label>
                Full Name:
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Email Verified:
                {emailVerified ? "Yes" : "No"}
                {!emailVerified && (
                    <UI.Button onClick={() => setEmailVerified(true)}>
                        Verify Email
                    </UI.Button>
                )}
            </label>
            <label>
                Phone Number:
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </label>
            <label>
                Avatar:
                <UI.Image src={avatar} alt="User Avatar" width={50} height={50} />
                <input type="file" onChange={handleAvatarChange} />
            </label>
            <label>
                Social Media:
                <input
                    type="url"
                    value={socialMedia}
                    onChange={(e) => setSocialMedia(e.target.value)}
                />
            </label>
        </div>
    );
};
