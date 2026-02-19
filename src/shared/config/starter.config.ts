import packageJson from '../../../package.json';

export const STARTER_CONFIG = {
    name: "Next.js + NestJS Starter",
    version: packageJson.version,
    description: "Enterprise-ready стартовый набор с FSD архитектурой, аутентификацией и админ-панелью.",
    author: {
        name: "Никита Мочалов",
        url: "https://github.com/webNekit",
    },
    githubUrl: "https://github.com/webNekit/nextjs-starter-kit",
    features: [
        "Next.js 16 (App Router)",
        "NestJS Backend",
        "JWT Auth (Access + Refresh)",
        "FSD Architecture",
        "React Hook Form",
        "SWR",
        "Shadcn UI + Tailwind",
        "Nuqs URL State",
        "Zod",
        "Zod Form Data",
        "Set Cookie Parser"
    ]
} as const;