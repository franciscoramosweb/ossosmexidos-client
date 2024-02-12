import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function MainPage() {
  return (
    <motion.div animate={{ x: [-100, 0] }} className={styles.main}>
      <div className={styles.aboutTitle}>
        <h1>MEET THE BIG BONE LADS</h1>
      </div>
      <div data-scroll data-scroll-speed="0.1" className={styles.introSection}>
        <motion.div
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}
          className={styles.imageContainer}
        >
          <img src="./carvi-drawings/homelessus.jpg" alt="" />
        </motion.div>
        <div className={styles.introDescription}>
          <p>
            Here are the faces you love and will always cherish. These are some
            of the most importante faces in the world right now, like if you
            have not heard of these guys what you doing?{" "}
          </p>
        </div>
      </div>

      <section className={styles.peopleSection}>
        <div className={styles.person}>
          <div className={styles.personDescription}>
            <h1>CHICO</h1>
            <h2>GENIUS / DEVELOPER</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
              faucibus nisi, sit amet ornare urna. Donec iaculis id leo non
              faucibus. Curabitur sollicitudin iaculis elit eu convallis.
            </p>
          </div>
          <motion.div
            whileHover={{
              scale: [null, 1.5, 1.4],
            }}
            transition={{ duration: 0.3 }}
            className={styles.imageContainer}
          >
            <img src="./carvi-drawings/chicocrazy.jpg" alt="" />
          </motion.div>
        </div>
        <div className={styles.person}>
          <motion.div
            whileHover={{ scale: [null, 1.5, 1.4] }}
            transition={{ duration: 0.3 }}
            className={styles.imageContainer}
          >
            <img src="./carvi-drawings/uglyman.jpg" alt="" />
          </motion.div>
          <div className={styles.personDescription}>
            <h1>CARVI</h1>
            <h2>OK / DESIGNER</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
              faucibus nisi, sit amet ornare urna. Donec iaculis id leo non
              faucibus. Curabitur sollicitudin iaculis elit eu convallis.
            </p>
          </div>
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
