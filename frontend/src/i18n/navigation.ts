import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
export const { Link, redirect, useRouter, usePathname } = createNavigation(routing);
export type Href = Parameters<typeof Link>[0]["href"];
