import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { IntlErrorCode } from "next-intl";

export const SUPPORTED_LOCALES = ["vi", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const reportToErrorTracking = (error: unknown) => {
    console.error("Gửi lỗi này lên server tracking:", error);
};

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    if (!locale || !SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
        notFound();
    }

    return {
        locale,
        messages: {
            ...(await import(`../messages/${locale}/common.json`)).default,
            
        },
        timeZone: "Europe/Vienna",
        onError(error) {
            if (error.code === IntlErrorCode.MISSING_MESSAGE) {
                console.log(error);
            } else {
                reportToErrorTracking(error);
            }
        },
        getMessageFallback({ namespace, key, error }) {
            const path = [namespace, key].filter((part) => part != null).join(".");

            if (error.code === IntlErrorCode.MISSING_MESSAGE) {
                return path + " is not yet translated";
            } else {
                return "Dear developer, please fix this message: " + path;
            }
        },
    };
});
