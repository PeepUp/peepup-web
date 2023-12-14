import * as UI from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="px-2 font-medium mb-8 md:px-20">
            <h1 className="mb-10 text-center text-3xl font-bold ">
                Terms and Conditions of Use
            </h1>

            <h2 className="text-xl mt-6 font-bold">1. Terms</h2>

            <p className="py-4 text-base">
                By accessing this Website, accessible from www.peepup.com, you are
                agreeing to be bound by these Website Terms and Conditions of Use and
                agree that you are responsible for the agreement with any applicable local
                laws. If you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are protected
                by copyright and trade mark law.
            </p>

            <h2 className="text-xl mt-6 font-bold">2. Use License</h2>

            <p className="py-4 text-base">
                Permission is granted to temporarily download one copy of the materials on
                PeepUp's Website for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this
                license you may not:
            </p>

            <ul className="flex flex-col gap-4 w-full px-12 py-4 list-decimal">
                <li>
                    <p>Modify or copy the materials;</p>
                </li>
                <li>
                    <p>
                        Use the materials for any commercial purpose or for any public
                        display;
                    </p>
                </li>
                <li>
                    <p>
                        Attempt to reverse engineer any software contained on PeepUp's
                        Website;
                    </p>
                </li>
                <li>
                    <p>
                        Remove any copyright or other proprietary notations from the
                        materials; or
                    </p>
                </li>
                <li>
                    <p>
                        Transferring the materials to another person or "mirror" the
                        materials on any other server.
                    </p>
                </li>
            </ul>

            <p className="py-4 text-base">
                This will let PeepUp to terminate upon violations of any of these
                restrictions. Upon termination, your viewing right will also be terminated
                and you should destroy any downloaded materials in your possession whether
                it is printed or electronic format.
            </p>

            <h2 className="text-xl mt-6 font-bold ">3. Disclaimer</h2>

            <p className="py-4 text-base">
                All the materials on PeepUp's Website are provided "as is". PeepUp makes
                no warranties, may it be expressed or implied, therefore negates all other
                warranties. Furthermore, PeepUp does not make any representations
                concerning the accuracy or reliability of the use of the materials on its
                Website or otherwise relating to such materials or any sites linked to
                this Website.
            </p>

            <h2 className="text-xl font-bold mt-6">4. Limitations</h2>

            <p className="py-4 text-base">
                PeepUp or its suppliers will not be hold accountable for any damages that
                will arise with the use or inability to use the materials on PeepUp's
                Website, even if PeepUp or an authorize representative of this Website has
                been notified, orally or written, of the possibility of such damage. Some
                jurisdiction does not allow limitations on implied warranties or
                limitations of liability for incidental damages, these limitations may not
                apply to you.
            </p>

            <h2 className="text-xl mt-6 font-bold ">5. Revisions and Corrections</h2>

            <p className="py-4 text-base">
                The materials appearing on PeepUp's Website may include technical,
                typographical, or photographic errors. PeepUp will not promise that any of
                the materials in this Website are accurate, complete, or current. PeepUp
                may change the materials contained on its Website at any time without
                notice. PeepUp does not make any commitment to update the materials.
            </p>

            <h2 className="text-xl mt-6 font-bold">6. Links</h2>

            <p className="py-4 text-base">
                PeepUp has not reviewed all of the sites linked to its Website and is not
                responsible for the contents of any such linked site. The presence of any
                link does not imply endorsement by PeepUp of the site. The use of any
                linked website is at the user's own risk.
            </p>

            <h2 className="text-xl mt-6 font-bold">7. Site Terms of Use Modifications</h2>

            <p className="py-4 text-base">
                PeepUp may revise these Terms of Use for its Website at any time without
                prior notice. By using this Website, you are agreeing to be bound by the
                current version of these Terms and Conditions of Use.
            </p>

            <h2 className="text-xl mt-6 font-bold ">8. Your Privacy</h2>

            <p className="py-4 text-base">
                Please read our{" "}
                <UI.Link
                    href="/privacy-policy"
                    rel="noopener noreferrer"
                    target="_self"
                    size="sm"
                    as={Link}
                    color="secondary"
                >
                    Privacy Policy
                </UI.Link>
                .
            </p>

            <h2 className="text-xl mt-6 font-bold ">9. Governing Law</h2>

            <p className="py-4 text-base">
                Any claim related to PeepUp's Website shall be governed by the laws of af
                without regards to its conflict of law provisions.
            </p>
        </div>
    );
}
