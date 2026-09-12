"use client"

import { NextIntlClientProvider, AbstractIntlMessages, IntlErrorCode } from "next-intl";

type IntlProps = {
    children: React.ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
};

const timeZone = 'Europe/Vienna';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportToErrorTracking = (error: any) => {
    console.error("Gửi lỗi này lên server tracking:", error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any) {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error(error);
    } else {
        reportToErrorTracking(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessageFallback({ namespace, key, error }: any) {
    const path = [namespace, key].filter((part) => part != null).join('.');
    if (error.code === 'MISSING_MESSAGE') {
        return path + ' is not yet translated';
    } else {
        return 'Dear developer, please fix this message: ' + path;
    }
}

export default function IntlProvider({ children, locale, messages }: IntlProps) {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={timeZone}
            onError={onError}
            getMessageFallback={getMessageFallback}>
            {children}
        </NextIntlClientProvider>
    );
}