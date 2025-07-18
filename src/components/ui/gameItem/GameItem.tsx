import type { GameItemProps } from "./types/gameItem";
import styles from "./GameItem.module.scss";
import Link from "next/link";

function GameItem ({ id, index }: GameItemProps) {
  return (
    <li className={styles.item}>
      <Link href={`/game/${id}`}>
				<span>Размер: 3x3</span> 
				<h3>#{index}</h3>
			</Link>
    </li>
  );
};

export default GameItem;