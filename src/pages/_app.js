import "@styles/custom.css";
import { CartProvider } from "react-use-cart";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Internal imports
import GoogleLoginButton from '../components/GoogleLoginButton'; // Vérifie le chemin
import store from "@redux/store";
import useAsync from "@hooks/useAsync";
import { handlePageView } from "@lib/analytics";
import { UserProvider } from "@context/UserContext";
import DefaultSeo from "@components/common/DefaultSeo";
import { SidebarProvider } from "@context/SidebarContext";
import SettingServices from "@services/SettingServices";
import ErrorBoundary from '../components/ErrorBoundary'; 

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { data: storeSetting, loading, error } = useAsync(SettingServices.getStoreSetting);

  useEffect(() => {
    // Initialize Google Analytics
    if (!loading && !error && storeSetting?.google_analytic_status) {
      ReactGA.initialize(storeSetting?.google_analytic_key || "");
      handlePageView(); // Initial page load

      const handleRouteChange = (url) => {
        handlePageView(`/${router.pathname}`, "Kachabazar");
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [storeSetting, loading, error, router]);

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="239148526030-samd0s2coarnjjmtrattgbpf6ds4mdit.apps.googleusercontent.com">
        <>
          {!loading && !error && storeSetting?.tawk_chat_status && (
            <TawkMessengerReact
              propertyId={storeSetting?.tawk_chat_property_id || ""}
              widgetId={storeSetting?.tawk_chat_widget_id || ""}
            />
          )}
          
          <SessionProvider session={pageProps.session}> 
            <UserProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <SidebarProvider>
                    <CartProvider>
                      <DefaultSeo />
                      {/*<GoogleLoginButton />*/}
                      <Component {...pageProps} />
                    </CartProvider>
                  </SidebarProvider>
                </PersistGate>
              </Provider>
            </UserProvider>
          </SessionProvider>
        </>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default MyApp;