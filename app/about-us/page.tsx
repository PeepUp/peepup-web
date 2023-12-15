import * as UI from "@nextui-org/react";

import Link from "next/link";

export default function Page() {
    return (
        <div className="px-2 font-medium max-sm:mb-4 md:px-20">
            <div className="mb-10 text-center text-3xl font-bold">About PeepUp</div>

            <p className="py-6 text-base">
                <strong>Peepup</strong> is more than just a platform; it is a haven for
                the exchange of human experiences and the birthplace of groundbreaking
                ideas. Every voice matters here, regardless of social reach or the size of
                a mailing list. Users can share their unique perspectives, impart valuable
                knowledge, and distill wisdom from their life's journey. In the midst of
                the internet's clamor, Peepup emerges as a tranquil sanctuary, teeming
                with profound insights. The platform is user-friendly, visually appealing,
                encourages collaboration, and ensures that every voice reaches the
                audience it deserves.
            </p>

            <p className="py-6 text-base">
                Peepup recognizes the transformative power of words. Words can bridge
                divides or create them, inspire action or breed apathy. In a world where
                sensationalism often overshadows substance, Peepup is committed to
                fostering an environment that rewards depth, appreciates nuance, and
                values meaningful engagement with content. The platform champions
                thoughtful discourse over ephemeral hot takes and prioritizes the essence
                of a message over its presentation. The ultimate goal is to enhance our
                shared understanding of the world around us through the compelling power
                of the written word.
            </p>

            <p className="py-6 text-base">
                If you’re new to Peepup,{" "}
                <a className="mt-4 text-start w-full">
                    <UI.Link
                        href="/privacy-policy"
                        rel="noopener noreferrer"
                        target="_self"
                        as={Link}
                        color="secondary"
                    >
                        start exploring
                    </UI.Link>
                </a>{" "}
                on a journey of exploration. Delve into topics that pique your interest,
                discover posts that challenge your thinking, offer fresh insights, and
                then, when you're ready, share your own narrative. Peepup is a community
                where every story has the potential to enlighten, inspire, and resonate.
            </p>
            <UI.Code size="md">"If it works, it worked"</UI.Code>
            <div className="py-6">Happy Blogging ❤</div>
        </div>
    );
}
