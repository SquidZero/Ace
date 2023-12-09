import { Button, Form, Offcanvas } from 'react-bootstrap';
import { useState, useReducer } from 'react';
export default function CardEdit() {

    const [postDeck, setPostDeck] = useState([]);
    const [, forceUpdate] = useReducer(x => x * 1, 1);
    const [menuShow, setShowMenu] = useState(false);
    const [done, setDone] = useState(false);
    let [enteringDef, setEnteringDef] = useState(false);

    async function SubmitPostDeck() {
            const url = '/edit_cards';
            let data = null;
            for (var element of postDeck) {
                console.log(element);
                if (element.length === 2) {
                    data = { "Term": element[0], "Definition": element[1] };
                    const response = fetch(
                        url,
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
                    );
                    if ((await response).ok) {
                        console.log("ok!");
                    } else if (!(await response).ok) {
                        console.log("not okay");
                    }
                    if (data != null)
                        console.log(data);
                }
            }
    }
    function showCorrectTextbox(manualSet) {
        if (document.querySelector("#definition") != null && document.querySelector("#term") != null) {
            if (enteringDef == false || manualSet == false) {
                document.querySelector("#definition").style.display = "none";
                document.querySelector("#term").style.display = "flex";
                document.querySelector("#term").focus();
            } else if (enteringDef == true || manualSet == true) {
                document.querySelector("#definition").style.display = "flex";
                document.querySelector("#term").style.display = "none";
                document.querySelector("#definition").focus();
            } else {
                document.querySelector("#defintion").style.display = "none";
                document.querySelector("#term").style.display = "none";
                document.querySelector("#next").focus();
            }

        } else {
            showCorrectTextbox();
        }
    }
    function addCard(event) {
        event.preventDefault();
        if (document.querySelector("#form-enter-info") != null) {

            let data = new FormData(document.querySelector("#form-enter-info"));
            let submitData = Array(1);
            for (const [name, value] of data) {
                if (name === "term") {
                    submitData[0] = value;
                } else if (name === "definition") {
                    submitData[1] = value;
                } else {
                    console.error("invalid form!");
                }
            }
            setPostDeck([...postDeck, submitData]);
            document.querySelector("#term").value = "";
            document.querySelector("#definition").value = "";
            console.log(postDeck);
        } else {
            addCard(event);
        }
    }
    function enterEvent(e, isBtn) {
        if (e.key === "Enter" || isBtn) {
            e.preventDefault();
            document.querySelector("input").blur();
            forceUpdate();
            console.log("enter key pressed");
            setEnteringDef(!enteringDef);
            enteringDef = !enteringDef;
            console.log("enteringDef is " + enteringDef);
            showCorrectTextbox(true);
        }
        showCorrectTextbox();
    }

    let menu = <div id="menu">
        <Button variant="primary" type="button" onClick={() => { setShowMenu(true); console.log(menuShow); }}>#</Button>
        <Offcanvas show={menuShow} onHide={() => { setShowMenu(false); }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>OffCanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Button variant="primary" type="button" onClick={() => { setDone(true); console.log("hellow?"); SubmitPostDeck() }}>Done</Button>
            </Offcanvas.Body>
        </Offcanvas>
    </div>

    let nextBtn = <div><Button type="submit" className="nextCard">&gt;</Button></div>
    let cardEditBtn =
        <div>
            <button type="button"
                className="card"
                id="next"
                onFocus={() => {
                    if (document.activeElement.tagName === "INPUT" && document.querySelector("#term") != null && document.querySelector("#definition") != null) {
                        document.onkeydown = ((event) => { enterEvent(event) });
                    }
                    forceUpdate();
                }}>
                <button type="button" className="card" id="invisibleBtn" onClick={(event) => enterEvent(event, true)} />
                <Form.Group size="lg" controlId="formPlaintext" style={{ zIndex: 1 }}>
                    <Form.Control type="text" placeholder="Enter definition here..." name="definition" id="definition" className="enter-info" aria-label="enter definition" />
                    <Form.Control type="text" placeholder="Enter term here..." name="term" id="term" className="enter-info" aria-label="enter term" />
                </Form.Group>
            </button>
        </div>

    let cardEditForm = <>
        <Form method="post" id="form-enter-info" onLoad={() => showCorrectTextbox()} onSubmit={(e) => addCard(e)}>
            {cardEditBtn}
            {nextBtn}
            {menu}
        </Form>
    </>

    return cardEditForm;

}
