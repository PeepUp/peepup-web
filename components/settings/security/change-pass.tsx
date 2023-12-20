import React, { useState } from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";
import { MyInput } from "@/components/input";
import Link from "next/link";
import TwoAuth from "@/components/legal-agreement/two-auth";
import StrongPassword from "@/components/legal-agreement/strong-password";
import { cn } from "@/lib/utils";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const validatePassword = (password: string) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const isValidLength = password.length >= 8;
        return (
            isValidLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
        );
    };

    const isValid = validatePassword(password);
    const {
        isOpen: isOpenTwoAuth,
        onOpen: onOpenTwoAuth,
        onOpenChange: onOpenChangeTwoAuth,
    } = UI.useDisclosure();
    const {
        isOpen: isOpenStrongPass,
        onOpen: onOpenStrongPass,
        onOpenChange: onOpenChangeStrongPass,
    } = UI.useDisclosure();

    const [isEnabled, setIsEnabled] = useState(false);

    const handleClick = () => {
        setIsEnabled(!isEnabled);
    };

    const TwoAuthCard = () => (
        <UI.Card className="w-full flex flex-col justify-center text-center items-center my-6 bg-transparent">
            <UI.CardHeader className="flex gap-3 justify-center text-center items-center">
                <div>
                    <Icons.LockIcon size={36} className="mb-2" />
                </div>
            </UI.CardHeader>
            <UI.Divider />
            <UI.CardBody>
                <div className="flex flex-col justify-center text-center items-center my-6">
                    <h2 className="mb-2">
                        {isEnabled
                            ? "Two-factor authentication is enabled."
                            : "Two-factor authentication is not enabled yet."}
                    </h2>
                    <p>
                        Two-factor authentication adds an additional layer of security to
                        your account by requiring more than just a password to sign in.
                    </p>
                </div>
            </UI.CardBody>
            <UI.Divider />
            <UI.CardFooter className="justify-center text-center items-center">
                <div className="flex flex-col justify-center text-center items-center my-4">
                    <UI.Button
                        className="w-30 py-4 mx-auto font-medium"
                        onClick={handleClick}
                    >
                        <span>
                            <span>
                                {isEnabled
                                    ? "Disable two-factor authentication"
                                    : "Enable two-factor authentication"}
                            </span>
                        </span>
                    </UI.Button>
                    <UI.Link
                        onPress={onOpenTwoAuth}
                        rel="noopener noreferrer"
                        target="_self"
                        as={UI.Link}
                        size="sm"
                        color="secondary"
                        className="text-base Link my-2"
                        showAnchorIcon
                        style={{ cursor: "pointer" }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        Learn more
                    </UI.Link>
                    <UI.Modal
                        size="lg"
                        isOpen={isOpenTwoAuth}
                        onOpenChange={onOpenChangeTwoAuth}
                        scrollBehavior="inside"
                    >
                        <TwoAuth />
                    </UI.Modal>
                </div>
            </UI.CardFooter>
        </UI.Card>
    );

    return (
        <section>
            <div className={cn(["gap-8 py-8", "max-md:py-18", "font-medium"])}>
                <form
                    className="edit_user"
                    id="change_password"
                    aria-label="Change password"
                    action="/account/password"
                    method="post"
                >
                    <div className="mb-10 text-3xl font-bold ">Change password</div>
                    <div className="form-group password-confirmation-form w-1/2 max-md:w-4/5">
                        <div className="mb-2 mt-4">
                            <label>Old password</label>
                        </div>
                        <MyInput
                            radius="sm"
                            size="md"
                            isRequired
                            minLength={5}
                            maxLength={255}
                            color="darker"
                            type="password"
                            id="user_old_password"
                            className="form-control form-control"
                            value={oldPassword}
                            onValueChange={setOldPassword}
                        />
                    </div>
                    <div>
                        <div className="form-group password-confirmation-form w-1/2 max-md:w-4/5">
                            <div className="mb-2 mt-4">
                                <label>New password</label>
                            </div>
                            <MyInput
                                size="md"
                                radius="sm"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                type="password"
                                name="user[password]"
                                id="user_new_password"
                                value={password}
                                onValueChange={setPassword}
                            />
                        </div>
                        <div className="form-group password-confirmation-form w-1/2 max-md:w-4/5">
                            <div className="mb-2 mt-4">
                                <label htmlFor="user_confirm_new_password">
                                    Confirm new password
                                </label>
                            </div>
                            <MyInput
                                size="md"
                                name="password"
                                radius="sm"
                                isRequired
                                minLength={10}
                                maxLength={64}
                                color="darker"
                                type={"password"}
                                value={confirmPassword}
                                onValueChange={setConfirmPassword}
                            />
                        </div>
                        <p className="text-sm my-2 font-normal">
                            Make sure it's at least 15 characters OR at least 8 characters
                            including a number and a lowercase letter.{" "}
                            <UI.Link
                                onPress={onOpenStrongPass}
                                rel="noopener noreferrer"
                                target="_self"
                                as={UI.Link}
                                color="secondary"
                                className="text-sm Link"
                                showAnchorIcon
                                style={{ cursor: "pointer" }}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                Learn more
                            </UI.Link>
                            <UI.Modal
                                size="lg"
                                isOpen={isOpenStrongPass}
                                onOpenChange={onOpenChangeStrongPass}
                                scrollBehavior="inside"
                            >
                                <StrongPassword />
                            </UI.Modal>
                        </p>
                    </div>
                    <div className="py-4">
                        <UI.Button className="w-30 py-4 mx-auto font-medium">
                            Update password
                        </UI.Button>

                        <UI.Link
                            href=""
                            rel="noopener noreferrer"
                            target="_self"
                            as={Link}
                            color="secondary"
                            className="pl-4"
                        >
                            I forgot my password
                        </UI.Link>
                    </div>
                </form>
            </div>

            <TwoAuthCard />
        </section>
    );
}
