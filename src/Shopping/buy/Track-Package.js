import { Modal } from "react-bootstrap";


export default function TrackPackage(props) {
    return (
        <div>
            <Modal show={props.show} onHide={() => props.setShow(false)}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Track Package
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}