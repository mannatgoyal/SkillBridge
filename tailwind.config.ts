import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                surface: "var(--surface)",
                "surface-hover": "var(--surface-hover)",
                primary: "var(--primary)",
                "primary-hover": "var(--primary-hover)",
                "text-main": "var(--text-main)",
                "text-muted": "var(--text-muted)",
                border: "var(--border)",
                success: "var(--success)",
                warning: "var(--warning)",
                error: "var(--error)",
            },
        },
    },
    plugins: [],
};
export default config;
