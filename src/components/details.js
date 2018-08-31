import React, { Component } from 'react';
import axios from 'axios';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './details.css';
const myURL = 'https://cryptic-beyond-48811.herokuapp.com';

let indexVehicle = window.location.pathname.split("/").pop();

export default class Details extends Component {
    constructor() {
        super();
        this.state = {
            vehicle: {},
            modal: false
        }
    }

    componentDidMount() {
        axios.get(`${myURL}/vehicles/${indexVehicle}`)
        .then(result => {
            let data = result.data.data[0];
            console.log(result);
            this.setState({ 
                vehicle: data
            })
        });
      }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal
        });
    }

    edit = (event) => {
        event.preventDefault();
        let vehicleEdited = this.state.vehicle;
        vehicleEdited.description = event.target[0].value;
        this.setState({ 
            vehicle: vehicleEdited,
            modal: !this.state.modal
        });
        let description = { description: event.target[0].value };
        axios.put(`${myURL}/vehicles/edit/description/${indexVehicle}`, description)
            .then(response => {
                console.log(response);
        });
    }
     
    render() {
        return (
            <div id="card">
                <div>
                    <p>Name: {this.state.vehicle.vehicle_name}</p>
                    <p>Created: {this.state.vehicle.time_created}</p>
                    <p>Type: {this.state.vehicle.car_type}</p>
                    <p className="description">Description: {this.state.vehicle.description}</p>
                    <Button className="btnEditDescription" onClick={this.toggle} />
                </div>
                <Modal id="modalEdit" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit the Automobile <b>{this.state.vehicle.vehicle_name}</b></ModalHeader>
                    <ModalBody>
                        <Form id="formEdit" onSubmit={this.edit}>
                            <FormGroup>
                                <Label for="nameCar">Description:</Label>
                                <Input type="text" name="description" id="description" defaultValue={this.state.vehicle.description} maxLength="255" required />                 
                            </FormGroup>
                        </Form>                    
                    </ModalBody>
                     <ModalFooter>
                        <Button type="submit" form="formEdit" color="info">Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <a href='/'><button className="btnReturn"></button></a>
            </div>
        )
    }
}
