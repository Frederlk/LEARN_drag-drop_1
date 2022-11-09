import { useState } from "react";
import "./App.css";

function App() {
    const [cardList, setCardList] = useState([
        { id: 1, order: 1, text: "Card 1" },
        { id: 2, order: 2, text: "Card 2" },
        { id: 3, order: 3, text: "Card 3" },
        { id: 4, order: 4, text: "Card 4" },
    ]);

    const [currentCard, setCurrentCard] = useState(null);

    function dragStartHandler(e, card) {
        setCurrentCard(card);
    }
    function dragLeaveHandler(e) {}

    function dragEndHandler(e) {
        e.target.style.background = "white";
    }
    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = "lightgray";
    }
    function dropHandler(e, card) {
        e.preventDefault();
        setCardList(
            cardList.map((c) => {
                if (c.id === card.id) {
                    return { ...c, order: currentCard.order };
                }
                if (c.id === currentCard.id) {
                    return { ...c, order: card.order };
                }
                return c;
            })
        );
        e.target.style.background = "white";
    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className="app">
            {cardList.sort(sortCards).map((card) => (
                <div
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, card)}
                    draggable={true}
                    className="card"
                    key={card.id}
                >
                    {card.text}
                </div>
            ))}
        </div>
    );
}

export default App;
