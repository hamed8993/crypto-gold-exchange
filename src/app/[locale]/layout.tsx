import { rtlLanguages } from "@/core/constants/constants";
import { persistKeys } from "@/core/constants/keys";
import MainProvider from "@/core/providers/mainProvider";
import Theme from "@/core/providers/themeProvider";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import "./globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const metadata: Metadata = {
  title: "Goldfino",
  description: "Trade Gold with any asset",
  manifest: "/api/manifest",
};

export type localeType = "en" | "fa" | "ar" | "tr" | "ru";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: localeType };
}>) {
  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const cookiesStore = await cookies();
  const loginFromCookie =
    cookiesStore.get(persistKeys.GOLDFINO_LOGIN_TOKEN)?.value || "";

  return (
    <html
      lang={await locale}
      dir={rtlLanguages.includes(locale) ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="../../assets/fonts/Vazirmatn-RD-FD-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="../../assets/fonts/goldfino.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={(await locale) === "fa" ? "!font-farsi" : "!font-english"}
      >
        <NextIntlClientProvider messages={messages}>
          <Theme>
            <MainProvider loginFromCookie={loginFromCookie}>
              {children}
            </MainProvider>
          </Theme>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
