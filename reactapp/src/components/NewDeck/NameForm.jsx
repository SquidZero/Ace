import { Form, Button } from 'react-bootstrap';
import CardEdit from './CardEdit';

export default function NameForm(props) {

    const name = props.name;
    const params = new URLSearchParams(window.location.search);
    function submitName(e) {
        e.preventDefault();
        const f = e.target;
        const formData = new FormData(f);
        const url = '/new/submit';
        console.log(f);
        fetch(
            url,
            {
                method: 'POST',
                body: formData
            }
        );
        params.set('s', '1');
        props.setStage(1);
        props.setCurrentPage(<CardEdit />);
        return false;
    }



    let nameForm = <Form action="/new" method="post" onSubmit={e => { return submitName(e); }} id="form-new-deck" data-bs-theme="dark">
        <Form.Group size="lg" className="title" controlId="formPlaintext">
            <Form.Label htmlFor="title">Title:</Form.Label>
            <Form.Control type="text" name="name" id="name" aria-label="deck_name" />
            <Form.Text id="suggestion">ex. {name}</Form.Text>
        </Form.Group>
        <Form.Group size="lg" className="subject" controlId="formOptions">
            <Form.Label htmlFor="subject">Subject</Form.Label>
            <Form.Select size="lg" name="subject" id="subject">
                <option value="">--Subject--</option>
                <option value="0">Math</option>
                <option value="1">English</option>
                <option value="2">Social Studies</option>
                <option value="3">Science</option>
                <option value="4">Life Science</option>
                <option value="5">Chemistry</option>
                <option value="6">Advanced Chemistry</option>
                <option value="7">Earth Scrience</option>
                <option value="8">Accelerated Math</option>
                <option value="9">Algebra</option>
                <option value="10">Spanish</option>
                <option value="11">French</option>
                <option value="12">German</option>
                <option value="13">Health</option>
                <option value="14">Technology</option>
                <option value="15">Fax/Home & Careers</option>
            </Form.Select>
        </Form.Group>

        <Form.Group size="lg" className="submit" controlId="formSubmit">
            <br />
            <Button varient="primary" type="submit">
                Next
            </Button>
        </Form.Group>
    </Form>;

    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    return nameForm;
}