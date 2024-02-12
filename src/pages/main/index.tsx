import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MainPage() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <motion.div animate={{ x: [-100, 0] }} className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.titlesContainer}>
          
          <div className={styles.topContainer}>
            <div className={styles.title}>
              <h1 className={styles.areYouStretch}>ARE YOU</h1>
              <h1 className={styles.hungryStretch}>HUNGRY</h1>

            </div>
            <div className={styles.title}>
              <h1 className={styles.forStretch}>FOR</h1>
            </div>
          </div>

          {<div className={styles.bottomContainer}>
            <div className={styles.title}>
              <h1 className={styles.sumStretch}>SUM</h1>
            </div>
            <div className={styles.title}>
            <h1 className={styles.ossosStretch}>OSSOS</h1>
              <h1 className={styles.mexidosStretch}>MEXIDOS?</h1>
            </div>
          </div> }
        </div>
      </section>

      <section className={styles.descriptionSection}>
        <div data-scroll data-scroll-speed="0.1" className={styles.textBlock}>
          <p>
            We’re Ossos Mexidos, a cool ass movement. We deliver spell-binding
            parties for everyone. Come join us and be free for a little bit
          </p>
        </div>
      </section>

      <section className={styles.comeShakeSection}>
        <h2>COME SHAKE YOUR BONES</h2>
        <div className={styles.textBlock}>
          <p>
            Find out where the bones are heading next, maybe somewhere near you
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <h2>BOOK THE BONES</h2>
        <div className={styles.textBlock}>
          <p>ossosmexidos@gmail.com</p>
        </div>
      </section>
    </motion.div>
  );
}
