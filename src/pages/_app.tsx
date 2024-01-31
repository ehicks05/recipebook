import type { AppType } from "next/app";
import Head from "next/head";
import { Ubuntu } from "next/font/google";

import { api } from "../utils/api";

import Footer from "components/Footer";
import Nav from "components/Nav";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <ClerkProvider {...pageProps} appearance={{ baseTheme: dark, variables: { colorInputText: '#222' } }}>
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
        <Component {...pageProps} key={router.asPath} />
        <div className="flex-grow"></div>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Footer />
      </div>
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
