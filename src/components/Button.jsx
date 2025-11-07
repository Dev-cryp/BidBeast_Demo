// --- NEW IMPORT ---
import { motion } from "framer-motion";
import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  // --- UPDATED CLASSES ---
  // Added "group", "overflow-hidden", and "rounded-[1rem]"
  // - "group" lets us trigger animations on children
  // - "overflow-hidden" contains the shine effect
  // - "rounded-[1rem]" should match your site's border radius
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 group overflow-hidden rounded-[1rem] ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  
  const spanClasses = "relative z-10";

  // --- NEW: Shine Effect Component ---
  // This span creates the white "shine" that sweeps across
  // It's hidden by "overflow-hidden" and moves on "group-hover"
  const renderShine = () => (
    <span className="absolute inset-0 z-5 block w-full h-full overflow-hidden rounded-[1rem]">
      <span className="absolute block w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
    </span>
  );

  const renderButton = () => (
    // --- UPDATED: Using motion.button ---
    <motion.button
      className={classes}
      onClick={onClick}
      // Adds a "pop" on hover
      whileHover={{ scale: 1.05 }}
      // Adds a "press" on tap
      whileTap={{ scale: 0.95 }}
      // Uses a springy physics animation
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {renderShine()}
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </motion.button>
  );

  const renderLink = () => (
    // --- UPDATED: Using motion.a ---
    <motion.a
      href={href}
      className={classes}
      // Adds a "pop" on hover
      whileHover={{ scale: 1.05 }}
      // Adds a "press" on tap
      whileTap={{ scale: 0.95 }}
      // Uses a springy physics animation
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {renderShine()}
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </motion.a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;