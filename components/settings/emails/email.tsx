import React, { useState } from "react";
import * as UI from "@nextui-org/react";
import { MyInput } from "@/components/input";
import { cn } from "@/lib/utils";

export default function EmailSetting() {
    return (
        <section>
            <div className={cn(["gap-8 py-8", "max-md:py-18"])}>
                <form
                    className="edit_user"
                    id="change_password"
                    aria-label="Change password"
                    action="/account/password"
                    method="post"
                >
                    <div className="mb-10 text-3xl font-bold ">Email</div>
                    <div className="form-group password-confirmation-form">
                        <div className="mb-2 mt-4">
                            <label>
                                <strong>Primary email address</strong>
                            </label>
                            <p className="my-3 font-normal">
                                Because you have email privacy enabled,
                                <code> wkwk@gmail.com</code> will be used for
                                account-related notifications as well as password resets.{" "}
                                <code>90511215+wkwk@users.noreply.peepup.com</code> will
                                be used for web-based operations.
                            </p>
                        </div>
                        <div className="w-1/2 max-md:w-4/5">
                            <MyInput
                                radius="sm"
                                size="md"
                                isRequired
                                minLength={5}
                                maxLength={255}
                                color="darker"
                                isDisabled
                                type="email"
                                value="wkwk@gmail.com"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="form-group password-confirmation-form">
                            <div className="mb-2 mt-6">
                                <label>
                                    {" "}
                                    <strong>Backup email address</strong>
                                </label>
                                <p className="my-3 font-normal">
                                    Your backup PeepUP email address will be used as an
                                    additional destination for security-relevant account
                                    notifications and can also be used for password
                                    resets.
                                </p>
                            </div>
                            <div className="w-1/2 max-md:w-4/5">
                                <MyInput
                                    size="md"
                                    radius="sm"
                                    isRequired
                                    minLength={5}
                                    maxLength={255}
                                    color="darker"
                                    type="email"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="py-6">
                        <UI.Button className="w-30 py-4 mx-auto font-medium">
                            Save
                        </UI.Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
