import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Ubuntu } from "@next/font/google";

import { api } from "../utils/api";

import Footer from "components/Footer";
import Nav from "components/Nav";
import "../styles/globals.css";
import Head from "next/head";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <title>RecipeBook</title>
      </Head>

      <div className={`flex h-screen flex-col ${ubuntu.className}`}>
        <Nav />
        <Component {...pageProps} />
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
