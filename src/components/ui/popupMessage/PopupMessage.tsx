import { useEffect, useState } from "react";
import styles from "@/styles/game.module.scss";

export function PopupMessage ({ message, onClose } : { message: string, onClose: () => void }) {
  const [show, setShow] = useState(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    if (message) {
      setShow(true);
      setAnimationClass(styles["popup-enter"]);
      const appearTimer = setTimeout(() => {
        setAnimationClass(styles["popup-enter-active"]);
      }, 1000);
      const hideTimer = setTimeout(() => {
        setAnimationClass(styles["popup-exit-active"]);
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 300);
      }, 4000);
      return () => {
        clearTimeout(appearTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShow(false);
      setAnimationClass("");
    }
  }, [message, onClose]);

  if (!show) return null;
  return (
    <div className={`${styles.popup} ${animationClass}`}>
      {message}
    </div>
  );
};