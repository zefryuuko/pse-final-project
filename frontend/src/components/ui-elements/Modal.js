import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            locations: undefined
        }

        Global.modal = this

        // Bind functions
        this.onChangeSelection = this.onChangeSelection.bind(this);
    }

    onChange = (i, data) => {
        this.setState({
            selected: i,
            name: data.name,
            location: data.location_id
        }, this.forceUpdate())
    }

    onChangeTyping = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeSelection = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    onSaveButtonClicked = () => {
        let data = {
            name: this.state.name ? this.state.name : JSON.parse(localStorage.getItem('data'))[parseInt(localStorage.getItem('selected'))].name, 
            maxDistance: JSON.parse(localStorage.getItem('data'))[parseInt(localStorage.getItem('selected'))].max_distance, 
            locationId: this.state.location ? this.state.location : JSON.parse(localStorage.getItem('data'))[parseInt(localStorage.getItem('selected'))].location_id,
            grafanaId: JSON.parse(localStorage.getItem('data'))[parseInt(localStorage.getItem('selected'))].grafana_id
        }
        axios.put(`https://pse-api.zef.sh/bins/bin/`+JSON.parse(localStorage.getItem('data'))[parseInt(localStorage.getItem('selected'))].hardware_id, data, { headers: {'Content-Type': 'application/json'} })
        .then(res => {
            window.location.reload()
        })
    }

    componentDidMount() {
        axios.get(`https://pse-api.zef.sh/locations`)
        .then(res => {
            // console.log(res.data)
            const locations = res.data;
            this.setState({ locations });
        })
    }

    render() { 
        if (this.state.locations !== undefined)
        return (
            <div id="Modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add Function</h4></div>
                        <div className="modal-body">
                            <form>
                                <ul className="list-group">
                                    Name:
                                    <input defaultValue={this.state.name} onChange={this.onChangeTyping}></input>
                                    Location:
                                    {
                                        <select id="location" name="location" onChange={this.onChangeSelection}>
                                            {
                                                this.state.locations.map((loc, index) => {
                                                    return <option value={loc.id} selected={this.state.location === loc.id ? "selected" : ""}>{loc.name}</option>
                                                })
                                            }
                                        </select>
                                    }
                                </ul>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" className="btn btn-success" 
                                data-dismiss="modal"
                                onClick={this.onSaveButtonClicked}
                            >
                                Save
                            </button>
                            <button 
                                type="button" className="btn btn-light" data-dismiss="modal" 
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        else return null
    }
}

export default Modal