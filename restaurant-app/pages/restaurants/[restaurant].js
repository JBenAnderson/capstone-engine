import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

export default function Restaurant() {
  const router = useRouter();

  //example of dynamic routing in next.js
  return <h1>Dynamic Restaurant Page {router.query.restaurant}</h1>;
}
