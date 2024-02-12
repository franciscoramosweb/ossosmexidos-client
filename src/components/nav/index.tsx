import React from "react";
import styles from "./styles.module.scss";
import { Links } from "./data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function index() {

  const perspective = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 30,
    },
    enter: (i) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      transition: {
        duration: 0.65,
        opacity: { delay: 0.6, duration: 0.45 },
        delay: 0.5 + i * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      translateY: 130,
    },
  };

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {Links.map(({ href, title }, i) => {
          return (
            <div key={i} className={styles.linkContainer}>
              <motion.div
                variants={perspective}
                animate="enter"
                custom={i}
                exit="exit"
                initial="initial"
              >
                <Link to={href}>{title}</Link>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
