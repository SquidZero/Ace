import { Form, Button } from 'react-bootstrap';
export default function NewDeck(props) {
    const name = props.name;
    let msg = <div id="form-new-deck" data-bs-theme="dark">
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/src/styles/NewDeck.css"/>
        <Form action="/new/submit" method="post" id="f">
                <Form.Group size="lg" className="title" controlId="formPlaintext">
                <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control type="text" name="name" id="name" aria-label="deck_name" />
                <Form.Text id="suggestion">ex. {name}</Form.Text>
                </Form.Group>
                <br/>
                <Form.Group size="lg" className="subject" controlId="formOptions">
                    <Form.Label htmlFor="subject">Subject</Form.Label>
                    <Form.Select size="lg" name="subject" id="subject">
                        <option value="">--Subject--</option>
                        <option value="ss">Social Studies</option>
                        <option value="science">Science</option>
                        <option value="life science">Life Science</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="advanced chemistry">Advanced Chemistry</option>
                        <option value="es">Earth Scrience</option>
                        <option value="math">Math</option>
                        <option value="accelerated math">Accelerated Math</option>
                        <option value="algebra">Algebra</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="health">Health</option>
                        <option value="technology">Technology</option>
                        <option value="fax">Fax/Home & Careers</option>
                    </Form.Select>
            </Form.Group>
            <Form.Group size="lg" className="submit" controlId="formSubmit">
            <br/>
                <Button varient="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    </div>;
    
    return (msg);
}