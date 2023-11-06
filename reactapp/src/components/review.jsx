import { useState } from "react";
import "/src/styles/card.css";

export let displayAnswer = false;
export default function Review(props) {
    const [currentCard, setCard] = useState(0);
    let cards = []; // [term, definition]
    getCards(null);
    let term = <h1>{cards[0][currentCard][0]}</h1>;
    let definition = <h1>{cards[0][currentCard][1]}</h1>;
    let contents = <div>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossOrigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="/src/styles/card.css"
        />
    </div>


    function getCards(deck) {
        let gottenCards = [["eccentricity", "ovalness"],
        ["galaxy", "collection of billions of stars, dust, and gasses"],
        ["What color represents the environment?", "green"]
        ];
        if (deck != null || deck != undefined) {
            gottenCards = deck.Array;
        }

        cards.push(gottenCards);

        return gottenCards;
    }
    function render() {
        getCards();
        return (
            <div className="card">
                {contents}
                {currentDisplay}
            </div>
        );
    }

    function nextCard() {
        if (currentCard >= cards.length) {
            setCard(0);
        } else {
            setCard(currentCard + 1);
        }
    }

    let userGuide = "Click to Proceed";
    let cardText = "";
    let currentDisplay = <button
        className="next"
        id="next"
        onMouseDown={() => {
            document.getElementById("next").style.color = "#444444";
        }}
        onClick={() => {
            if (displayAnswer == true) {
                displayAnswer = false;
                cardText = cards[0][currentCard][0];
            } else {
                displayAnswer = true;
                cardText = cards[0][currentCard][1];
                nextCard();
            }
            document.getElementById("next").innerHTML = "<h1>" + cardText + "</h1>";
        }}>
        <h1>
        { cards[0][currentCard][0] }
        </h1>
        { userGuide }
    </button>



    return (render());
} 