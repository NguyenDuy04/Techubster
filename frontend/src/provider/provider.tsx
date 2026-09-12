'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IntlProvider from "@/provider/intl-provider";
import { AbstractIntlMessages } from "next-intl";
import { useState, type ReactNode } from 'react';

type ProvidersProps = {
    children: ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </QueryClientProvider>
    );
}