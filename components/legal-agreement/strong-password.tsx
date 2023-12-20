import * as React from "react";
import * as UI from "@nextui-org/react";

export default function StrongPassword() {
    return (
        <UI.ModalContent>
            {(onClose) => (
                <>
                    <UI.ModalHeader className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-center">
                            Creating a strong password
                        </h1>
                    </UI.ModalHeader>
                    <UI.ModalBody className="modal-content">
                        <section className="flex flex-col justify-center items-center max-w-md mx-auto h-full text-sm text-justify ">
                            <p className="mt-4 text-lg">
                                Secure your account on PeepUp with a strong and unique
                                password using a password manager.
                            </p>

                            <p className="mt-4">
                                <strong>
                                    You must select or generate a password for your
                                    account on PeepUp.com that is at least :
                                </strong>
                            </p>

                            <p className="mt-2">
                                <ol className="px-6 list-disc py-4">
                                    <li className="mb-4">
                                        Eight characters long, if it includes a number and
                                        a lowercase letter,
                                    </li>
                                    <li className="mb-4">
                                        15 characters long with any combination of
                                        characters
                                    </li>
                                </ol>
                            </p>

                            <p className="mt-2">
                                <strong>
                                    To keep your account secure, we recommend you follow
                                    these best practices:
                                </strong>
                                <ol className="px-6 list-disc py-4">
                                    <li className="mb-4">
                                        Generate a unique password for PeepUp. If you use
                                        your PeepUp password elsewhere and that service is
                                        compromised, then attackers or other malicious
                                        actors could use that information to access your
                                        account on PeepUp.
                                    </li>
                                    <li className="mb-4">
                                        Set up two-factor authentication for your personal
                                        account.
                                    </li>
                                    <li className="mb-4">
                                        Optionally, add a passkey to your account to
                                        enable a secure, passwordless login.
                                    </li>
                                    <li className="mb-4">
                                        Never disclose your password, even to a potential
                                        collaborator. Each person should use their own
                                        personal account on PeepUp.
                                    </li>
                                </ol>
                            </p>

                            <p className="mb-4">
                                When you enter a password to sign in, create an account,
                                or change your password, PeepUp will check if the password
                                you entered is considered weak according to datasets like
                                HaveIBeenPwned. The password may be flagged as weak even
                                if you have never used that password before.
                            </p>
                            <p className="mb-4">
                                PeepUp only inspects the password at the time you enter
                                it, and never stores the password you entered in
                                plaintext.
                            </p>
                            <p className="mb-4">
                                You can only use your password to log on to PeepUp using
                                your browser. When you authenticate to PeepUp with other
                                means, such as the command line or API, you should use
                                other credentials.
                            </p>
                            <p className="mb-4">
                                When PeepUp prompts you for your password, enter your
                                personal access token. Alternatively, you can use a
                                credential helper like PeepUp Credential Manager.
                                Password-based authentication has been removed in favor of
                                more secure authentication methods.
                            </p>
                        </section>
                    </UI.ModalBody>
                    <UI.ModalFooter></UI.ModalFooter>
                </>
            )}
        </UI.ModalContent>
    );
}
