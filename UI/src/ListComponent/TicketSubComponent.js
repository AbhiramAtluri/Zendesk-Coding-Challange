import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

export default class TicketSubComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ModalOpen: false
        }
    }

    componentDidMount() {

    }


    handleModalOpen = () => {
     
        this.setState({
            ModalOpen: true
        })
    }

    handleModalClose = () => {
        
        this.setState(
            {
                ModalOpen: false
            })
    }

    render() {
        return (
            <div>
                <div className="row  " style={{ padding: "0px", marginLeft: "0px", marginRight: "0px", marginBottom: "10px" }}>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                       
                            <a className="list-group-item list-group-item-action flex-column " style={{ backgroundColor: "ghostwhite" ,cursor:"pointer"}} onClick={this.handleModalOpen}  >
                                <div className="row" style={{ marginBottom: "5px" }}>
                                    <div className="col-md-2 ">
                                        <p>{this.props.item.id}</p>
                                    </div>
                                    <div className="col-md-6">
                                        {this.props.item.subject}
                                    </div>

                                    <div className="col-md-4">
                                        {this.props.item.status}
                                    </div>
                                 
                                </div>
                            </a>
                      
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
                {this.state.ModalOpen === true ? <div>

                    <Modal
                        // {...props}
                        show={this.state.ModalOpen}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        backgroundColor="aliceblue"
                        onHide={this.handleModalClose}
                    >
                        <Modal.Header>
                            <div className="container-fluid"  >
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            {this.props.item.subject}

                                        </Modal.Title>
                                    </div>
                                </div>
                                <div className="row p-1">
                                    <div className="col-md-4">
                                        Requester id: {this.props.item.requester_id}
                                    </div>
                                    <div className="col-md-4">
                                        Submitter id: {this.props.item.submitter_id}
                                    </div>
                                    <div className="col-md-4 " style={{ paddingInline: "0" }}>
                                        Organization id: {this.props.item.organization_id}
                                    </div>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body>

                            <p>
                                {this.props.item.description}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleModalClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div> :

                    <div></div>
                }
            </div>
        )
    }
}
