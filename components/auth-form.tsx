import * as Z from "zod";
import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Schema from "@/lib/schema/identity/signup";

import LoadingSpinner from "./spinner";

import { toast } from "sonner";
import { MyInput } from "./input";
import { siteConfig } from "@/config/site";
import { useAuthFormContext } from "@/context/store";
import { checkEmailAvailability, submitSignUpForm } from "@/lib/api/auth";

export function AuthForm(props: AuthFormProps) {
    const { data, setData } = useAuthFormContext();
    const [isOnSubmit, setIsOnSubmit] = React.useState(false);
    const [inputForm, setInputForm] = React.useState<AuthInputForm>({} as AuthInputForm);

    async function validateTraits() {
        let data: unknown;

        if (props.email) {
            const parse = Schema.email.safeParse(inputForm.traitsValue);

            if (parse.success === true) {
                /* const response = await checkEmailAvailability(inputForm.traitsValue);

                if (response.status !== 204) {
                    console.log("email already registered");
                    return new Z.ZodError([
                        {
                            code: "invalid_string",
                            message: "Invalid email address or email already registered",
                            path: ["email"],
                            fatal: true,
                            validation: "email",
                        },
                    ]);
                } */

                console.log("parse as email");
                setInputForm({ ...inputForm, traitsType: "email" });
                return parse;
            }

            console.log("failed to parse as email");
            data = parse.error;
        }

        if (props.username) {
            const parse = Schema.username.safeParse(inputForm.traitsValue);
            if (parse.success === true) {
                console.log("parse as username");
                setInputForm({ ...inputForm, traitsType: "username" });
                return parse;
            }

            console.log("failed to parse as username");
            data = parse.error;
        }

        if (props.phone_number) {
            const parse = Schema.phone.safeParse(inputForm.traitsValue);
            if (parse.success === true) {
                console.log("parse as phone");
                setInputForm({ ...inputForm, traitsType: "phone_number" });
                return parse;
            }
            console.log("failed to parse as phone");
            data = parse.error;
        }

        return data;
    }

    async function validatePassword() {
        const parse = Schema.password.safeParse(inputForm.password);

        if (parse.success === true) {
            console.log("parse as medium password");

            // continue to parse as strong password
            const strongParse = Schema.strongPwd.safeParse(inputForm.password);

            if (strongParse.success === true) {
                console.log("parse as strong password");
                return strongParse;
            }

            return strongParse.error;
        } else {
            console.log("parsed as medium password");
            return parse.error;
        }
    }

    async function preSubmit(): Promise<boolean> {
        const parseInputTraits = await validateTraits();
        const parseInputPassword = await validatePassword();

        if (parseInputTraits instanceof Z.ZodError) {
            const traitsEl = document.querySelector(
                'input[name="traits"]'
            ) as HTMLInputElement;

            toast.warning("Validation fields failed", {
                description: parseInputTraits.errors[0].message,
                position: "top-center",
            });

            traitsEl.focus();
            return false;
        }

        if (parseInputPassword instanceof Z.ZodError) {
            const passwordEl = document.querySelector(
                'input[name="password"]'
            ) as HTMLInputElement;
            toast.warning("Validation fields failed", {
                description: parseInputPassword.errors[0].message,
                position: "top-center",
            });
            passwordEl.focus();
            return false;
        }

        return true;
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        setIsOnSubmit(true);
        e.preventDefault();

        if (!(await preSubmit())) return setIsOnSubmit(false);

        try {
            let response: Response | undefined;
            if (props.type === "signup") {
                response = await submitSignUpForm({
                    traits: {
                        [inputForm.traitsType ?? "email"]: inputForm.traitsValue,
                    },
                    password: inputForm.password,
                });
            }

            if (!response) throw new Error("Failed to create account! Server is busy");

            if (response.status === 201) {
                setData({
                    ...data,
                    email: inputForm.traitsValue,
                    signUpCompleted: true,
                });

                return setIsOnSubmit(false);
            }

            if (response.status === 400) {
                const error = await response.json();
                return toast.warning("Validation fields failed", {
                    description: error.errors[0].message,
                    position: "top-center",
                });
            }

            if (response.status === 409) {
                toast.warning("Validation fields failed", {
                    description: "Email already registered or fields is invalid",
                    position: "top-center",
                });
                return setIsOnSubmit(false);
            }

            if (response.status === 500) {
                const error = await response.json();

                if (error.error === "traits already in use") {
                    toast.warning("Validation fields failed", {
                        description: "Email already registered",
                        position: "top-center",
                    });
                    return setIsOnSubmit(false);
                }
            }
        } catch (error) {
            if (error instanceof Z.ZodError) {
                toast.warning("Validation fields failed", {
                    description: error.errors[0].message,
                    position: "top-center",
                });
                return setIsOnSubmit(false);
            }

            if (error instanceof Error) {
                toast.error("Failed to create account!", {
                    position: "top-center",
                    description: "Sorry the server is busy, please try again later.",
                });
                return setIsOnSubmit(false);
            }

            toast.error(
                "Sorry, we're having trouble creating your account. Please try again later.",
                {
                    position: "top-center",
                    description: "Server Busy",
                }
            );
        }

        setIsOnSubmit(false);
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            {/* Email Username or Phone Number Input */}
            <div>
                <MyInput
                    size="md"
                    radius="sm"
                    isRequired
                    autoFocus={true}
                    placeholder={`Email ${
                        !props.username ? "or phone number" : ", username or phone number"
                    }`}
                    minLength={5}
                    maxLength={255}
                    color="darker"
                    type="text"
                    value={inputForm.traitsValue}
                    name="traits"
                    onValueChange={(value) =>
                        setInputForm({ ...inputForm, traitsValue: value })
                    }
                />
            </div>

            {/* Password Input */}
            <div>
                <MyInput
                    size="md"
                    name="password"
                    radius="sm"
                    isRequired
                    placeholder="Password"
                    minLength={10}
                    maxLength={64}
                    color="darker"
                    type={"password"}
                    value={inputForm.password}
                    onValueChange={(value) =>
                        setInputForm({ ...inputForm, password: value })
                    }
                />
            </div>

            {/* Submit SignUp Form Button */}
            <div>
                <UI.Button
                    size="md"
                    radius="sm"
                    className="flex justify-center items-center text-sm font-medium"
                    type="submit"
                    fullWidth
                    variant="solid"
                    color="default"
                    disabled={isOnSubmit}
                >
                    {!isOnSubmit ? (
                        `${props.submitLabel ?? "Sign up"}`
                    ) : (
                        <LoadingSpinner size="sm" color="current" />
                    )}
                </UI.Button>
            </div>

            <div className="mt-2 flex justify-center items-center w-full">
                <p className="text-center text-xs max-w-md">
                    Click <b className="text-white/70">Sign Up</b> to agree to PeepUp’s
                    &nbsp;
                    <UI.Link
                        href={siteConfig.links.termsOfService}
                        rel="noopener noreferrer"
                        target="_self"
                        as={UI.Link}
                        isExternal={false}
                        size="sm"
                        color="secondary"
                        showAnchorIcon
                        className="text-xs __link"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        Terms of Service
                    </UI.Link>
                    and acknowledge that PeepUp’s
                    <UI.Link
                        href={siteConfig.links.privacyPolicy}
                        rel="noopener noreferrer"
                        target="_self"
                        as={UI.Link}
                        isExternal={false}
                        size="sm"
                        color="secondary"
                        className="text-xs"
                        showAnchorIcon
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        &nbsp; Privacy Policy
                    </UI.Link>
                    applies to you.
                </p>
            </div>
        </form>
    );
}

export interface AuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    email?: boolean;
    username?: boolean;
    phone_number?: boolean;
    submitLabel?: string;
    type?: "signin" | "signup";
    method?: string;
}

export type AuthInputForm = {
    traitsValue: string;
    traitsType?: string;
    password: string;
};
