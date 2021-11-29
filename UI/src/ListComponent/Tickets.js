import React, { Component } from 'react'
import axios from 'axios'
import constants from '../utils/constants'
import TicketSubComponent from './TicketSubComponent'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'




export default class Tickets extends Component {


    constructor(props) {
        super(props)

        this.state = {
            listofTickets: [],
            loading: false,
            isloading: true,
            errormessage: false,
            next: "",
            prev: "",
            noMoreTickets: false,
            message:"Oops! Something went wrong"

        }
    }


    componentDidMount() {
        axios.get(constants.server).then(res => {
         

           if(res.data.status==200)
           {
            this.setState({
                listofTickets: res.data.ticketlist,
                isloading: false,
                errormessage: false,
                next: res.data.next,
                prev: res.data.prev,

            })
            }
            else
            {
                this.setState(
                    {
                        isloading: false,
                        errormessage: true,
                        message:res.data.message
                    })

            }


        }).catch(err => {
          

            this.setState(
                {
                    isloading: false,
                    errormessage: true
                })
        })
    }

    handleOnnext = () => {
        axios.get(`${constants.server}after/${this.state.next}`)
            .then(res => {
          
                if (res.data.next != null) {

                    this.setState(
                        {
                            listofTickets: res.data.ticketlist,
                            next: res.data.next,
                            prev: res.data.prev,
                            errormessage: false,
                            
                        })
                }
                else {
            
                    this.setState(
                        {
                            noMoreTickets: true
                        })
                }


            }).catch(err => {
          
                this.setState(
                    {
                        listofTickets: [],
                        message:"Oops! Something went wrong",
                        errormessage: true
                    })

            })
    }


    handleOnPrev = () => {

        axios.get(`${constants.server}before/${this.state.prev}`)
            .then(res => {
                if (res.data.prev != null) {

                    this.setState(
                        {
                            listofTickets: res.data.ticketlist,
                            next: res.data.next,
                            prev: res.data.prev,
                            errormessage: false
                        })
                }
                else {
            
                    this.setState(
                        {
                            noMoreTickets:true
                        }
                        )

                }
            }).catch(err => {
          
                this.setState(
                    {
                        listofTickets: [],
                        message:"Oops! Something went wrong",
                        errormessage: true
                    })

            })
    }

    handleOnAlertClose = () => {

        this.setState(
            {
                noMoreTickets: false
            })

    }





    render() {
   
        return (
            <div>
                <div className="container-fluid" style={{ padding: "0px", margin: "0px" }}>
                    <div className="row" style={{ padding: "0px", margin: "0px" }}>
                        <div className="container-fluid" style={{ padding: "0px", margin: "0px", backgroundColor: "ghostwhte" }}>
                            <div className="row" style={{ padding: "0px", margin: "0px" }}>
                                <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "aliceblue" }}  >
                                    <a className="navbar-brand" href="#">ZenDesk</a>
                                </nav>
                            </div>
                            <div className="row" style={{ padding: "0px", marginTop: "30px", marginLeft:"0px",marginRight:"0px" }}>
   
                            </div>
                            {this.state.isloading != true ? <div className="list-group">
                            <div className="row" style={{ padding: "0px", margin: "0px" }}>
                            <div className="col-md-3">
                           </div>
                           <div className="col-md-6">
                               <a class="list-group-item list-group-item-action">
                                <div className="container">
                                <div className="row">
                                 <div className="col-md-2">
                                <p>Ticket id</p>
                                
                                </div>
                                <div className="col-md-6">
                                 Subject
                            
                                </div>
                                <div className="col-md-4"   >                               
                                <p data-testid="test-1" style={{marginLeft:"20px"}}> Status</p>                           
                                </div>
                                </div>
                                </div>
                              </a>               
                             </div>
                                

                            </div>
                                {this.state.listofTickets.length > 0 ?
                                
                                    this.state.listofTickets.map((data, key) => {
                                        return <TicketSubComponent item={data}></TicketSubComponent>

                                    }
                                    )
                               
                                    : <div></div>
                                }
                            </div> :
                                <center><div className="spinner-border" style={{ width: "2rem", height: "2rem", marginTop: "10%", marginBottom: "50px" }} role="status">
                                    <span className="sr-only"></span>
                                </div></center>
                            }
                            {this.state.errormessage == true ? <center ><div class=" col-md-6 alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> {this.state.message}
                            </div></center>
                                : ""

                            }
                            {this.state.isloading!=true && this.state.errormessage!=true?
                            <center>
                                <nav style={{ marginTop: "10px" }}>
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a className="page-link" onClick={this.handleOnPrev} style={{width:"80px",cursor:"pointer"}} >Previous</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" onClick={this.handleOnnext} style={{width:"80px",cursor:"pointer"}} >Next</a>
                                        </li>
                                    </ul>
                                </nav> 
                            </center>:""
                            }


                        </div>

                    </div>
                </div>
                {this.state.noMoreTickets == true ? <Modal show={this.state.noMoreTickets} onHide={this.handleOnAlertClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>No More tickets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><center>No More tickets to fetch</center></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleOnAlertClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> : ""


                }


            </div>
        )
    }
}
