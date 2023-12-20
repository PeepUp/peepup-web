import * as FAQContent from "@/components/legal-agreement/faq-content";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "PeepUp",
    description: "PeepUp is a blogging platform for the people, by the people.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "About Us",
            href: "/about-us",
        },
        {
            label: "FAQ",
            href: "/faq",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    navItemsProfile: [
        {
            key: "Home",
            label: "Home",
            href: "/",
        },
        {
            key: "Profile",
            label: "Profile",
            href: "/me",
        },
        {
            key: "About",
            label: "About",
            href: "/about",
        },
        {
            key: "FAQ",
            label: "FAQ",
            href: "/faq",
        },
    ],
    faqItems: [
        {
            title: "How do I start a blog using this app?",
            content: FAQContent.content1,
        },

        {
            title: "What features does the app offer for content creation?",
            content: FAQContent.content2,
        },

        {
            title: "Are there any limitations on the type of content I can publish?",
            content: FAQContent.content3,
        },

        {
            title: "Can I save my favorite posts to read later?",
            content: FAQContent.content4,
        },

        {
            title: "What's the process for becoming a featured blogger on this platform?",
            content: FAQContent.content5,
        },
    ],

    links: {
        github: "https://github.com/nextui-org/nextui",
        twitter: "https://twitter.com/getnextui",
        docs: "https://nextui.org",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
        support: "/support",
        termsOfService: "/terms-of-service",
        privacyPolicy: "/privacy-policy",
        repository: "https://github.com/PeepUp",
    },
};
