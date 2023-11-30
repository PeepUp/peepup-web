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
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    faqItems: [
        {
            title: "Can I save my favorite posts to read later?",
            content:
                "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws.",
        },
        {
            title: "How do I start a blog using this app?",
            content:
                "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws.",
        },
        {
            title: "What features does the app offer for content creation?",
            content:
                "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws.",
        },
        {
            title: "Are there any limitations on the type of content I can publish?",
            content:
                "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws.",
        },
        {
            title: "What's the process for becoming a featured blogger on this platform?",
            content:
                "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws.",
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
