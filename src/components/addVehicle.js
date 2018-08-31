import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './addVehicle.css';
let titleCase = require('title-case'); // pipe to upper first letter of each word
let moment = require('moment'); // convert date to mysql format

export default class AddVehicle extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            alreadyExist: false
        }
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({ 
            modal: !this.state.modal, 
            alreadyExist: false 
        });
    }

    add = (event) => {
        event.preventDefault();
        let nameUpped = event.target[0].value;
        nameUpped = titleCase(nameUpped);
        let date_created = moment().format('YYYY-MM-DD HH:mm:ss');
        let carAdded = {
            vehicle_id: 0,
            vehicle_name: nameUpped,
            time_created: date_created,
            car_type: event.target[1].value,
            last_connection: date_created,
            description: ""
        }
        let checkExist = this.props.bindData.findIndex(a => a.vehicle_name === carAdded.vehicle_name);  // check if already exist
        if(checkExist !== -1) {
            this.setState({ alreadyExist: true });
        } else {
            carAdded.vehicle_id = this.props.bindData.length + 1;
            this.props.getAdded(carAdded);
            this.setState({ modal: !this.state.modal });
        }   
    } 

    render() {
        return (
            <div>     
                <button className="btnAdd" onClick={this.toggle}>+</button>
                <Modal id="modalAdd" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new Automobile</ModalHeader>
                    <ModalBody>
                        <Form id="formAdd" onSubmit={this.add}>
                            <FormGroup>
                                <Label for="nameCar">Name:</Label>
                                <Input type="text" name="nameCar" id="nameCar" required />                 
                                    {this.state.alreadyExist && (
                                        <Alert color="danger">
                                            Sorry, this car already exists.
                                        </Alert>
                                    )}
                                <Label for="exampleSelect">Type:</Label>
                                <Input type="select" name="select" id="exampleSelect" required>
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option>SUV</option>
                                    <option>Truck</option>
                                    <option>Hybrid</option>
                                </Input>
                            </FormGroup>
                        </Form>                    
                    </ModalBody>
                     <ModalFooter>
                        <Button type="submit" form="formAdd" color="info">Submit</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
