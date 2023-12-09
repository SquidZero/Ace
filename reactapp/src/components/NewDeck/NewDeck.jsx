import { useState } from 'react';
import CardEdit from './CardEdit';
import NameForm from './NameForm';
export default function NewDeck(props) {
    const [stage, setStage] = useState(-1);
    const params = new URLSearchParams(window.location.search);
    const [currentPage, setCurrentPage] = useState(<></>);
    //    const [firstRender, setFirstRender] = useState(true);


    if (params.get('s') == "0" && stage == -1) {

        console.log("stage is now 0");
        setStage(0);
        setCurrentPage(<NameForm setStage={setStage} setCurrentPage={setCurrentPage} name={props.name} />);
    } else if (params.get('s') == "1" && stage == 0) {
        setStage(1);
        setCurrentPage(<CardEdit />);
    }
    else if (params.has('s') === false) {
        params.set('s', '0');
    } else if (params.get('s') != stage) {
        setStage(0);
    }

    if (stage == 0) {
        document.body.style.alignItems = "flex-start";
        document.body.style.justifyContent = "flex-start";
        document.body.style.alignContent = "inherit";
    } else if (stage == 1) {
        params.set('s', '1');
        document.body.style.alignItems = "center";
        document.body.style.justifyContent = "center";
        document.body.style.alignContent = "center";
    }

    let styleSetup =
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/src/styles/NewDeck.css" />
            <link rel="stylesheet" href="/src/styles/card.css" />

        </div>;


    window.history.replaceState({}, '', `${location.pathname}?${params}`);

    return (
        <div>
            <div className="style-setup">
                {styleSetup}
            </div>
            {currentPage}
        </div>
    );
}