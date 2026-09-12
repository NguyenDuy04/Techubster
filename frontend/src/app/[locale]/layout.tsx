import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Providers from '@/provider/provider';
import ScrollRestoration from '@/components/common/scroll-restoration';

const SUPPORTED_LOCALES = ['vi', 'en'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
type LanguageProps = {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

export function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: {
        default: "RentFlow",
        template: "%s - RentFlow",
    },
};

export default async function LocaleLayout({ children, params }: LanguageProps) {
    const { locale } = await params;
    if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <Providers messages={messages} locale={locale}>
            {children}
            <ScrollRestoration />
        </Providers>
    );
}