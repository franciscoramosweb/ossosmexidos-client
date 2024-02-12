import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop.context";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";

export default function Index() {
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };

  const filenames = [
    "basquiat.jpg",
    "blueman.jpg",
    "chicocrazy.jpg",
    "cloud.jpg",
    "drunk.jpg",
    "grandma.jpg",
    "homelessus.jpg",
    "house.jpg",
    "housefront.jpg",
    "moon.jpg",
    "mouth.jpg",
    "onsight.jpg",
    "saudade.jpg",
    "skepta.jpg",
    "stars.jpg",
    "sun.jpg",
    "thatscrazy.jpg",
    "uglyman.jpg",
    "vase.jpg",
    "yellowman.jpg",
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const perspective = {
    initial: {
      translateX: 30,
    },
    enter: (i) => ({
      rotateX: 0,
      translateX: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      translateY: 130,
    },
  };

  return (
    <motion.div
      animate={{ x: [-100, 0] }}
      className={styles.imageGrid}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.spotifyPlayer}>
        <iframe
          src="https://open.spotify.com/embed/playlist/63jtmi10qohRYVeQZpUZWB?utm_source=generator"
          width="100%"
          height="552"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      {filenames.map((filename, i) => (
        <motion.div
          variants={perspective}
          animate="enter"
          custom={i}
          exit="exit"
          initial="initial"
          whileHover={{
            scale: [null, 1.1, 1.1],
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index when mouse leaves
          transition={{ duration: 0.3 }}
          key={i}
          style={{
            filter:
              hoveredIndex !== null && hoveredIndex !== i
                ? "brightness(0.8) blur(2px)"
                : "none",
            zIndex: hoveredIndex !== null && hoveredIndex === i ? 1 : "auto", // Increase z-index of hovered image
          }}
        >
          <motion.img
            style={{
              width:
                hoveredIndex !== null && hoveredIndex === i ? "auto" : "100%", // Set width to auto for selected image
              height:
                hoveredIndex !== null && hoveredIndex === i ? "auto" : "100%", // Set height to auto for selected image
            }}
            whileHover={{}}
            src={`./../carvi-drawings/${filename}`}
            alt={filename}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
