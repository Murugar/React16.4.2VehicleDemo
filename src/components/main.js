import React, { Component } from 'react';
import Vehicle from './vehicle';
import AddVehicle from './addVehicle';
import axios from 'axios';
import './main.css';
const myURL = 'https://cryptic-beyond-48811.herokuapp.com';
export default class Main extends Component {
    constructor(props) {
      super(props);
      this.state ={
        allVehicles: []
      }
    }
  
    componentDidMount() {
      axios.get(`${myURL}/vehicles`)
      .then(result => {
        let data = result.data.data;
        this.setState({ allVehicles: data })
      });
    }
  
    adding = (data) => {
      this.state.allVehicles.push(data);
      this.setState({ allVehicles: this.state.allVehicles });
      axios.post(`${myURL}/vehicles/new`, data)
        .then(response => {
          console.log(response);
      });
    }
  
    editing = (data) => {
      let allVehiclesEdited = this.state.allVehicles;
      allVehiclesEdited[data.vehicle_id-1] = data;
      this.setState({ allVehicles: allVehiclesEdited });
      let idEdited = data.vehicle_id;
      axios.put(`${myURL}/vehicles/edit/${idEdited}`, data)
        .then(response => {
          console.log(response);
      });
    }
    
    deleting = (data) => {
      this.state.allVehicles.splice(data.vehicle_id-1, 1);
      // Reassign new id's
      const newArr = this.state.allVehicles.map((object, index) => {
        object.vehicle_id = index + 1;
        return object;
      })
      this.setState({ allVehicles: newArr });
      let idDeleted = data.vehicle_id;
      axios.delete(`${myURL}/vehicles/delete/${idDeleted}`)
            .then(response => {
              console.log(response);
      });
    }
    
    render() {
      return (<div>
                <div id='kitt'>
                  <div className='one'></div>
                  <div className='two'></div>
                  <div className='three'></div>
                  <div className='four'></div>
                  <div className='five'></div>
                  <div className='six'></div>
                  <div className='seven'></div>
                  <div className='eight'></div>
                  <div className='nine'></div>
                  <div className='ten'></div>
                </div>     
                <div>
                  {this.state.allVehicles.map((vehicle) => {
                  return <Vehicle key={vehicle.vehicle_name}
                                  vehicle={vehicle}
                                  bindData={this.state.allVehicles}
                                  getEdited={this.editing}
                                  getDeleted={this.deleting}
                  /> })}
                  
                  <AddVehicle bindData={this.state.allVehicles} 
                              getAdded={this.adding}   
                  />
                </div>
              </div>
      );
    }
  }
  
  