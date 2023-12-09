import { useState } from "react";
import "/src/styles/card.css";

export let displayAnswer = false;
export default function Review() {
    const [currentCard, setCard] = useState(0);
    let cards = []; // [term, definition]
    let [cardsReady, setReady] = useState(false);
    getCards(fetchCards());
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

    async function fetchCards() {
        const response = await fetch('/get_deck');
        const data = await response.json();

        return data.map(item => [item.term, item.definition]);
    }
    async function getCards(deck) {
        if (deck === null || deck === undefined) {
            console.log("Unable to get cards!");
        }
        else {
            cards = await deck;
            setReady(true);
        }
    }

    function nextCard() {
        if (currentCard >= cards.length) {
            setCard(0);
        } else {
            setCard(currentCard + 1);
        }
    }
    function render() {
        if (cardsReady == true) {
            return (
                <div className="card">
                    {contents}
                    {currentDisplay}
                </div>
            );
        } else {
            return (<h1>waiting for response...</h1>);
        }
    }

    let userGuide = "Click to Proceed";
    let cardText = "";
    let currentDisplay;
    if (cardsReady == true) {
        displayAnswer = true;
        currentDisplay =
            <button
                className="next"
                id="next"
                onMouseDown={() => {
                    document.getElementById("next").style.color = "#444444";
                }}
                onClick={() => {
                    if (displayAnswer == true) {
                        displayAnswer = false;
                        try {
                            cardText = cards[currentCard][0];
                        } catch {
                            cardText = "You did it!";
                            nextCard();
                        }
                    } else {
                        displayAnswer = true;
                        cardText = cards[currentCard][1];
                        nextCard();
                    }
                    document.getElementById("next").innerHTML = "<h1>" + cardText + "</h1>";
                }}>
                <h1>
                    Click to start
                </h1>
                {userGuide}
            </button>
    } else {
        currentDisplay = <h1>Waiting for response...</h1>
    }

    return (render());
} 