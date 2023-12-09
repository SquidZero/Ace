import { Button } from 'react-bootstrap';
import '/src/styles/index.css';
export default function Root() {
    let loading = false;
    let contents = loading
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div style={{display: "flex"} }>
                <Button
                    href="/review"
                    variant="primary"
                    id="btn-review">
                    Review
                </Button>
                <Button
                    href="/new"
                    variant="primary"
                    id="btn-new">
                    New
                </Button>
            </div>;

        return (
            <div>
                <h1 id="tabelLabel" >Welcome to the study app!</h1>
                <p>Please select what you would like to do...</p>
                {contents}
            </div>
        );
}