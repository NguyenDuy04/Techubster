export interface LocaleConfig {
  name: string;
  code: string;
  flagCode?: string;
  isRTL?: boolean;
}

export const SUPPORTED_LOCALES = [
  {
    code: "vi",
    name: "Việt Nam",
    label: "Tiếng Việt",
    flag: "vn",
    currency: "₫",
    currencycode: "VND",
    namecurrency: "Vietnamese Dong",
  },
  {
    code: "en",
    name: "United States",
    label: "English",
    flag: "us",
    currency: "$",
    currencycode: "USD",
    namecurrency: "US Dollar",
  },
] as const;

export const DEFAULT_LOCALE = "vi";

export type Locale = keyof typeof SUPPORTED_LOCALES;
