"use client";
import * as React from "react";
import axios, { AxiosError } from "axios";
import {
    FacebookColoredIcon,
    ForwardIcon,
    GoogleIcon,
    TwitterColoredIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
    Input,
    Button,
    Link,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Chip,
} from "@nextui-org/react";
import toast, { ToastOptions } from "react-hot-toast";

const toastStyles: ToastOptions = {
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7ZM12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"
                fill="currentColor"
            />
        </svg>
    ),
    position: "top-center",
    style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#fff",
    },
};

const inputStyles = {
    label: "text-[#7A7A7A] text-sm",
    input: [
        "bg-transparent",
        "font-medium",
        "placeholder:text-sm",
        "dark:placeholder:text-[#7A7A7A]",
        "dark:text-[#7A7A7A]",
    ],
    base: ["bg-transparent, dark:text-[#7A7A7A], text-sm"],
    innerWrapper: "",
    inputWrapper: [
        "text-sm",
        "font-medium",
        "dark:bg-[#202020]",
        "bg-[#e0e0e0]",
        "backdrop-blur-none",
        "backdrop-saturate-0",
        "hover:bg-default-200/70",
        "focus-within:!bg-default-200/50",
        "focus-within:border-2",
        "focus-within:border-[#303030]",
        "dark:hover:bg-[#212121]",
        "dark:focus-within:!bg-[#202020]",
        "!cursor-text",
    ],
};

type SignUpArgsField = {
    email?: string;
    username?: string;
    phone?: string;
    password: string;
    method?: "password" | "google" | "twitter" | "facebook";
};

export async function submitSignUpForm(fields: SignUpArgsField) {
    const response = await fetch("http://127.0.0.1:4334/local/registration", {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            traits: {
                email: fields.email || "",
                phone_number: fields?.phone || "",
            },
            password: fields.password,
            method: "password",
        }),
    });
    return await response.json();
}

function Page() {
    const [fields, setFields] = React.useState<SignUpArgsField>({} as SignUpArgsField);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Email"]));
    const reference_array = ["Email", "Username", "Phone"];
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = await submitSignUpForm(fields);

        console.log(data);
        if (data.code === 409) {
            return toast("Email is invalid or already taken ", { ...toastStyles });
        }

        if (data.code === 400) {
            return toast("Please enter a valid fields", { ...toastStyles });
        }

        if (data.code === 201) {
            return toast("User created successfully", { ...toastStyles });
        }

        return toast("User created successfully", { ...toastStyles });
    }

    return (
        <section className="flex flex-col items-center justify-start gap-4 py-8 md:py-10 h-full w-full overflow-x-hidden">
            {/* Title */}
            <div className="justify-self-start mt-12 text-xl">
                <h3>Sign up with PeepUp account</h3>
            </div>

            <div className="w-1/2">
                <Dropdown backdrop="opaque">
                    <DropdownTrigger>
                        <Button
                            size="lg"
                            radius="sm"
                            variant="light"
                            className="capitalize dark:bg-transparent h-max py-2"
                            fullWidth
                        >
                            {selectedValue.length > 0
                                ? selectedValue.split(", ").map((value, index) => (
                                      <Chip
                                          key={index}
                                          className="capitalize bg-transparent dark:bg-[#202020] text-primary"
                                          color="primary"
                                          size="sm"
                                          onClose={() =>
                                              selectedKeys.size > 1
                                                  ? selectedKeys.delete(value) &&
                                                    setSelectedKeys(new Set(selectedKeys))
                                                  : null
                                          }
                                      >
                                          {value}
                                      </Chip>
                                  ))
                                : "Select a field"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Multiple selection field"
                        color="primary"
                        variant="flat"
                        emptyContent="No options"
                        closeOnSelect={false}
                        selectionMode="multiple"
                        aria-required={true}
                        autoFocus
                        bottomContent
                        disallowEmptySelection={true}
                        selectedKeys={selectedKeys}
                        defaultSelectedKeys={selectedKeys}
                        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
                        placeholder="Select a field"
                    >
                        <DropdownItem key="Email">Email</DropdownItem>
                        <DropdownItem key="Phone">Phone</DropdownItem>
                        <DropdownItem key="Username">Username</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            {/* Input Form */}
            <div className="w-1/2">
                <form onSubmit={onSubmit} method="post" className="flex flex-col gap-2">
                    {selectedValue.length > 0
                        ? selectedValue
                              .split(", ")
                              .sort(function (a, b) {
                                  return (
                                      reference_array.indexOf(a) -
                                      reference_array.indexOf(b)
                                  );
                              })
                              .map((value, index) => (
                                  <Input
                                      key={index}
                                      size="sm"
                                      radius="sm"
                                      isRequired={true}
                                      type={
                                          value.toLowerCase().match("email")
                                              ? "email"
                                              : "text"
                                      }
                                      classNames={{ ...inputStyles }}
                                      placeholder={`${value}`}
                                      className=""
                                      maxLength={255}
                                      minLength={10}
                                      aria-required={true}
                                      value={
                                          fields[
                                              value.toLowerCase() as keyof SignUpArgsField
                                          ]
                                      }
                                      onValueChange={(v) => {
                                          setFields({
                                              ...fields,
                                              [value.toLowerCase()]: v,
                                          });
                                      }}
                                  />
                              ))
                        : null}

                    {/* <div>
            <Input
              size="sm"
              radius="sm"
              type="email"
              classNames={{ ...styles }}
              placeholder="Email address, phone, or username"
              className=""
              maxLength={255}
              minLength={10}
            />
          </div>

          <div>
            <Input
              size="sm"
              radius="sm"
              classNames={{ ...styles }}
              placeholder="Password"
              className=""
              type={"password"}
            />
          </div> */}

                    <div>
                        <Input
                            size="sm"
                            radius="sm"
                            isRequired
                            classNames={{ ...inputStyles }}
                            placeholder="Password"
                            className=""
                            minLength={10}
                            maxLength={64}
                            type={"password"}
                            value={fields["password"]}
                            onValueChange={(v) => {
                                setFields({ ...fields, password: v });
                            }}
                        />
                    </div>

                    <div>
                        <Button
                            size="lg"
                            radius="sm"
                            type="submit"
                            fullWidth
                            className={cn(
                                "dark:bg-[#A8A8A8]",
                                "dark:text-[#101010]",
                                "text-sm",
                                "font-medium"
                            )}
                        >
                            Sign up
                        </Button>
                    </div>

                    <div className="mt-2 flex justify-center justify-self-end">
                        <p className="text-center text-sm font-medium dark:text-[#7a7a7a]">
                            Click “Sign up” to agree to PeepUp’s{" "}
                            <Link
                                href={"/signin"}
                                as={Link}
                                isExternal={false}
                                size="sm"
                                showAnchorIcon
                                className={cn("")}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                Terms of Service
                            </Link>{" "}
                            <br />
                            and acknowledge that PeepUp’s{" "}
                            <Link
                                href={"/signin"}
                                as={Link}
                                isExternal={false}
                                size="sm"
                                showAnchorIcon
                                className={cn("")}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                {" "}
                                Privacy Policy
                            </Link>{" "}
                            applies to you.
                        </p>
                    </div>

                    <div className="mt-4 flex w-full justify-center">
                        <p className="text-center text-sm font-medium dark:text-[#7a7a7a]">
                            or
                        </p>
                    </div>
                    {/* <div className="mt-4 flex w-full justify-center">
            <Link
              href={"#"}
              as={Link}
              isExternal
              color="foreground"
              className={cn("select-none")}
              onContextMenu={(e) => e.preventDefault()}
            >
              <p className="text-center text-sm">Forgotten password?</p>
            </Link>
          </div> */}
                </form>
            </div>

            {/* OAUTH PROVIDER SIGNUP */}
            <div className="w-1/2">
                <div className="mt-4 flex w-full justify-center items-center">
                    <Button
                        className={cn(
                            "dark:bg-[#202020]",
                            "w-full",
                            "flex",
                            "justify-stretch"
                        )}
                        type="button"
                        startContent={
                            <GoogleIcon size={20} className="mr-4 justify-self-start" />
                        }
                        endContent={
                            <ForwardIcon
                                size={20}
                                className="ml-auto justify-self-end fill-[#7a7a7a]"
                            />
                        }
                        radius="sm"
                        variant="solid"
                    >
                        <p className="justify-self-start">Sign up with Google</p>
                    </Button>
                </div>

                <div className="mt-2 flex w-full justify-center items-center">
                    <Button
                        className={cn(
                            "dark:bg-[#202020]",
                            "w-full",
                            "flex",
                            "justify-stretch"
                        )}
                        type="button"
                        startContent={
                            <TwitterColoredIcon
                                size={24}
                                className="mr-4 justify-self-start"
                            />
                        }
                        endContent={
                            <ForwardIcon
                                size={20}
                                className="ml-auto justify-self-end fill-[#7a7a7a]"
                            />
                        }
                        radius="sm"
                        variant="solid"
                    >
                        <p className="justify-self-start">Sign up with Twitter</p>
                    </Button>
                </div>

                <div className="mt-2 flex w-full justify-center items-center">
                    <Button
                        className={cn(
                            "dark:bg-[#202020]",
                            "w-full",
                            "flex",
                            "justify-stretch"
                        )}
                        type="button"
                        startContent={
                            <FacebookColoredIcon
                                size={24}
                                className="mr-4 justify-self-start"
                            />
                        }
                        endContent={
                            <ForwardIcon
                                size={20}
                                className="ml-auto justify-self-end fill-[#7a7a7a]"
                            />
                        }
                        radius="sm"
                        variant="solid"
                    >
                        <p className="justify-self-start">Sign up with Facebook</p>
                    </Button>
                </div>

                <div className="mt-4 flex w-full justify-center">
                    <p className="text-center text-sm font-medium dark:text-[#7a7a7a]">
                        {"Already have an account? "}
                        <Link
                            href={"/signin"}
                            as={Link}
                            isExternal={false}
                            size="sm"
                            showAnchorIcon
                            className={cn("select-none", "ml-1", "text-[#7a7a7a]")}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Page;
