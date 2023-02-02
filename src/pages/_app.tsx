import { useState } from "react";
import type { AppType } from "next/app";
import Head from "next/head";
import { Ubuntu } from "@next/font/google";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { api } from "../utils/api";

import Footer from "components/Footer";
import Nav from "components/Nav";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import AuthListener from "components/AuthListener";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

const MyApp: AppType<{ initialSession: Session }> = ({
  Component,
  pageProps,
}) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
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
        <Toaster position="bottom-right" reverseOrder={false} />
        <Footer />
      </div>
      <AuthListener />
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
