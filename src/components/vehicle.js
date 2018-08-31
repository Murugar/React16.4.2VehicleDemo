import React, { Component } from 'react';
import {Card, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './vehicle.css';

let titleCase = require('title-case'); // pipe to upper first letter of each word

export default class Vehicle extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal
        });
    }

    edit = (event) => {
        event.preventDefault();
        let nameUpped = event.target[0].value;
        nameUpped = titleCase(nameUpped);
        let carEdited = {
            vehicle_id: this.props.vehicle.vehicle_id,
            vehicle_name: nameUpped,
            car_type: event.target[1].value
        }
        if(carEdited.car_type === "") {
            carEdited.car_type = this.props.vehicle.car_type;
        }
        this.props.getEdited(carEdited);
        this.setState({ modal: !this.state.modal });
    } 

    delete = (data) => {
        this.props.getDeleted(this.props.vehicle);
    }

    render() {
        return (
            <div className="containCard">
                <Card className="card">
                    <img className="pic" alt="car" src={require('../pics/logo-car.jpg')}/>
                    <p className="nameVehicle">Model: {this.props.vehicle.vehicle_name}</p>
                    <p>Type: {this.props.vehicle.car_type}</p>
                    <p><a className="links" href={'/details/' + this.props.vehicle.vehicle_id}>Read More...</a></p>
                    <div className="d-inline-block">
                        <input type="button" className="btnEdit" onClick={this.toggle} />
                        <input type="button" className="btnDelete" onClick={this.delete} />
                    </div>
                </Card>
                <Modal id="modalEdit" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit a Automobile</ModalHeader>
                    <ModalBody>
                        <Form id="formEdit" onSubmit={this.edit}>
                            <FormGroup>
                                <Label for="nameCar">Name:</Label>
                                <Input type="text" name="nameCar" id="nameCar" defaultValue={this.props.vehicle.vehicle_name} required />                 
                                <Label for="exampleSelect">Type:</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option value="" selected disabled hidden>{this.props.vehicle.car_type}</option>
                                    <option>SUV</option>
                                    <option>Truck</option>
                                    <option>Hybrid</option>
                                </Input>
                            </FormGroup>
                        </Form>                    
                    </ModalBody>
                     <ModalFooter>
                        <Button type="submit" form="formEdit" color="info">Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
