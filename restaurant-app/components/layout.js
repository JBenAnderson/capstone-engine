import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
//import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";

const Layout = (props) => {
  const title = "Welcome to Nextjs";
  const { user } = useContext(AppContext);
  return (
    <>
      <div>
        <Head>
          <header>
            <style jsx>{`
              a {
                color: white;
              }
              h5 {
                color: white;
                padding-top: 11px;
              }
            `}</style>
            <Nav className="navbar navbar-dark bg-dark">
              <NavItem>
                <NavItem className="ml-auto"></NavItem>
              </NavItem>
            </Nav>
          </header>
          <Container>{props.children}</Container>
        </Head>
      </div>
    </>
  );
};

export default Layout;
