import { useState } from "react";
import "./App.css";

function App() {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "To Be Done",
            items: [
                { id: 1, title: "Shopping" },
                { id: 2, title: "Gaming" },
                { id: 3, title: "Coding" },
            ],
        },
        {
            id: 2,
            title: "To Be Checked",
            items: [
                { id: 4, title: "Cooking" },
                { id: 5, title: "Cleaning" },
                { id: 6, title: "Walking" },
            ],
        },
        {
            id: 3,
            title: "Done",
            items: [
                { id: 7, title: "Repair chair" },
                { id: 8, title: "Free desk" },
                { id: 9, title: "Unleash POWER" },
            ],
        },
    ]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    function dragStartHandler(e, board, card) {
        setCurrentBoard(board);
        setCurrentCard(card);
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = "none";
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = "none";
    }

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === "card") {
            e.target.style.boxShadow = "0 2px 3px gray";
        }
    }

    function dropHandler(e, board, card) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentCard);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(card);
        board.items.splice(dropIndex + 1, 0, currentCard);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
    }

    function dropCardHandler(e, board) {
        e.preventDefault();
        board.items.push(currentCard);
        const currentIndex = currentBoard.items.indexOf(currentCard);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
        e.target.style.boxShadow = "none";
    }

    return (
        <div className="app">
            {boards.map((board) => (
                <div
                    key={board.id + board.title}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                    className="board"
                >
                    <h2 className="board__title" draggable={false}>
                        {board.title}
                    </h2>
                    {board.items.map((item) => (
                        <div
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                            className="card"
                            key={item.id + item.title}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
