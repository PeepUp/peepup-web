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
