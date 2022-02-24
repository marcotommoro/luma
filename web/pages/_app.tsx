import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { Navbar } from "../components/Navbar";
import { initFirebase } from "../firebase.config";
import "../styles/globals.css";

initFirebase();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {router.route !== "/mobiledata" ? <Navbar /> : null}
      <div
        className={`${
          router.route !== "/mobiledata" ? "container mx-auto" : "w-100"
        } `}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
