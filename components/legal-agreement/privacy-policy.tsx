import * as React from "react";
import * as UI from "@nextui-org/react";

export default function PrivacyPolicy() {
    return (
        <UI.ModalContent>
            {(onClose) => (
                <>
                    <UI.ModalHeader className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-center">
                            Privacy Policy
                        </h1>
                    </UI.ModalHeader>
                    <UI.ModalBody className="modal-content">
                        <section className="flex flex-col justify-center items-center max-w-md mx-auto h-full text-sm text-justify">
                            <p className="mt-4">
                                <strong>At PeepUp</strong>, accessible from
                                www.peepup.com, one of our main priorities is the privacy
                                of our visitors. This Privacy Policy document contains
                                types of information that is collected and recorded by
                                PeepUp and how we use it. If you have additional questions
                                or require more information about our Privacy Policy, do
                                not hesitate to contact us.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Log Files
                            </h2>

                            <p className="mt-4">
                                PeepUp follows a standard procedure of using log files.
                                These files log visitors when they visit websites. All
                                hosting companies do this and a part of hosting services'
                                analytics. The information collected by log files include
                                internet protocol (IP) addresses, browser type, Internet
                                Service Provider (ISP), date and time stamp,
                                referring/exit pages, and possibly the number of clicks.
                                These are not linked to any information that is personally
                                identifiable. The purpose of the information is for
                                analyzing trends, administering the site, tracking users'
                                movement on the website, and gathering demographic
                                information.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Cookies and Web Beacons
                            </h2>

                            <p className="mt-4">
                                Like any other website, PeepUp uses "cookies". These
                                cookies are used to store information including visitors'
                                preferences, and the pages on the website that the visitor
                                accessed or visited. The information is used to optimize
                                the users' experience by customizing our web page content
                                based on visitors' browser type and/or other information.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Privacy Policies
                            </h2>

                            <p className="mt-4">
                                You may consult this list to find the Privacy Policy for
                                each of the advertising partners of PeepUp.
                            </p>

                            <p className="mt-4">
                                Third-party ad servers or ad networks uses technologies
                                like cookies, JavaScript, or Web Beacons that are used in
                                their respective advertisements and links that appear on
                                PeepUp, which are sent directly to users' browser. They
                                automatically receive your IP address when this occurs.
                                These technologies are used to measure the effectiveness
                                of their advertising campaigns and/or to personalize the
                                advertising content that you see on websites that you
                                visit.
                            </p>

                            <p className="mt-4">
                                Note that PeepUp has no access to or control over these
                                cookies that are used by third-party advertisers.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Third Party Privacy Policies
                            </h2>

                            <p className="mt-4">
                                PeepUp's Privacy Policy does not apply to other
                                advertisers or websites. Thus, we are advising you to
                                consult the respective Privacy Policies of these
                                third-party ad servers for more detailed information. It
                                may include their practices and instructions about how to
                                opt-out of certain options.{" "}
                            </p>

                            <p className="mt-4">
                                You can choose to disable cookies through your individual
                                browser options. To know more detailed information about
                                cookie management with specific web browsers, it can be
                                found at the browsers' respective websites.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Children's Information
                            </h2>

                            <p className="mt-4">
                                Another part of our priority is adding protection for
                                children while using the internet. We encourage parents
                                and guardians to observe, participate in, and/or monitor
                                and guide their online activity.
                            </p>

                            <p className="mt-4">
                                PeepUp does not knowingly collect any Personal
                                Identifiable Information from children under the age of
                                13. If you think that your child provided this kind of
                                information on our website, we strongly encourage you to
                                contact us immediately and we will do our best efforts to
                                promptly remove such information from our records.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Online Privacy Policy Only
                            </h2>

                            <p className="mt-4">
                                This Privacy Policy applies only to our online activities
                                and is valid for visitors to our website with regards to
                                the information that they shared and/or collect in PeepUp.
                                This policy is not applicable to any information collected
                                offline or via channels other than this website.
                            </p>

                            <h2 className="text-xl mt-8 font-semibold text-center">
                                Consent
                            </h2>

                            <p className="mt-4">
                                By using our website, you hereby consent to our Privacy
                                Policy and agree to its Terms and Conditions.
                            </p>
                        </section>
                    </UI.ModalBody>
                    <UI.ModalFooter></UI.ModalFooter>
                </>
            )}
        </UI.ModalContent>
    );
}
