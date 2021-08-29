import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "../components/context.js";
import Home from "./index";
import Layout from "../components/layout";
//import Cookie from "js-cookie";

function MyApp(props) {
  var { user, setUser } = useContext(AppContext);
  const { Component, pageProps } = props;

  return (
    <>
      <AppContext.Provider
        value={{ isAuthenticated: false, user: null, setUser: () => {} }}
      >
        <Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Head>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
