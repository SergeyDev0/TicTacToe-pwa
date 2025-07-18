'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { getGame, moveGame } from "@/api/games";
import { Board, CellValue, CurrentMove, Result } from "@/api/types/games";
import { PopupMessage } from "@/components/ui/popupMessage/PopupMessage";
import styles from "@/styles/game.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function Game() {
	const { id } = useParams<{id: string}>();

	const [currentPlayer, setCurrentPlayer] = useState<CurrentMove>();
	const [board, setBoard] = useState<Board>([]);
  const [result, setResult] = useState<Result>("None");
  const [chanceReplace, setChanceReplace] = useState<number>(0);
  const [popup, setPopup] = useState<string>("");

	const isTablet = useMediaQuery("(max-width: 790px)");
	const isPhone = useMediaQuery("(max-width: 500px)");

	useEffect(() => {
		getStateBoard();
	}, []);

	const getStateBoard = () : void => {
		if(id) {
			getGame(id)
				.then((res) => {
					console.log(res);
					setCurrentPlayer(res.currentMove)
					setBoard(res.board);
					setResult(res.result)
					setChanceReplace(res.currentStep);
          if (res.result === "Draw") {
            setPopup("Ничья!");
          } else if (res.result === "WinX") {
            setPopup("Победа игрока X");
          } else if (res.result === "WinO") {
            setPopup("Победа игрока O");
          }
				});
		}
	}

	const makeMove = (rowId: number, colId: number) : void => {
		console.log(colId, rowId)
		if(id) {
			moveGame(id, {
				p: currentPlayer!,
				x: rowId,
				y: colId,
			})
			.then((res) => {
				console.log(res);
				getStateBoard();
			});
		}
	}

	const fillCell = (cell: CellValue) : string => {
		if(cell === "X") return "X";
		if(cell === "O") return "O";
		return "";
	}

	const sizeCell = () : number => {
		if(board.length === 30) {
			if(isTablet) {
				return ((window.innerWidth - 40) / 30);
			} else {
				return 25;
			}
		} else if (board.length === 10) {
			if(isTablet) {
				return ((window.innerWidth - 40) / 10);
			} else {
				return 60;
			}
		} else if (board.length === 5) {
			if(isPhone) {
				return ((window.innerWidth - 40) / 5);
			} else {
				return 70;
			}
		} else {
			if(isPhone) {
				return ((window.innerWidth - 120) / 3);
			} else {
				return 80;
			}
		}
	}
	return (
		<div className={styles.game}>
			<PopupMessage message={popup} onClose={() => setPopup("")} />
			<div className={styles.header}>
				<div className={styles.row}>
					<Link href="/">
						<MoveLeft />
					</Link>
					{(result === "None") ? (
						<h3>Сейчас ходит: <span>{currentPlayer}</span></h3>
					) : (
						<h3>Игра завершена</h3>
					)}
				</div>
				<div className={styles.row}>
					<h3>Вероятность замены: <span>{chanceReplace}%</span></h3>
				</div>
			</div>
			<div className={styles.fieldWrapper}>
				
				<div className={styles.field}>
					{board.map((row, rowId) => (
						<div key={rowId} className={styles.row}>
							{row.map((cell, colId) => (
								<button 
									key={colId}
									className={styles.cell}
									onClick={() => makeMove(rowId, colId)}
									style={{
										width: sizeCell(),
										height: sizeCell(),
										fontSize: sizeCell(),
									}}
								>
									{fillCell(cell)}
								</button>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
};

export default Game;