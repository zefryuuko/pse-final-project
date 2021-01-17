import React, { Component } from 'react';
import axios from 'axios';

class ModalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: undefined
        }

        // Bind functions
        this.onChangeSelection = this.onChangeSelection.bind(this);
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeMaxDistance = (event) => {
        this.setState({
            maxDistance: event.target.value
        })
    }

    onChangeSelection = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    onChangeSelection2 = (event) => {
        this.setState({
            hardware: event.target.value
        })
    }

    onSaveButtonClicked = () => {
        let data = {
            hardwareId: this.state.hardware, 
            name: this.state.name, 
            maxDistance: this.state.maxDistance,
            locationId: this.state.location
        }
        axios.post(`https://pse-api.zef.sh/bins/configure`, data)
        .then(res => {
            window.location.reload()
        })
    }

    componentDidMount() {
        axios.get(`https://pse-api.zef.sh/locations`)
        .then(res => {
            // console.log(res.data)
            const locations = res.data;
            this.setState({ locations, location: locations[0].id });
        })

        axios.get(`https://pse-api.zef.sh/bins/unconfigured`)
        .then(res => {
            // console.log(res.data)
            const unconfigured = res.data;
            if (unconfigured.length !== 0)
            this.setState({ unconfigured, hardware: unconfigured[0].hardware_id });
        })
    }

    render() { 
        if (this.state.locations !== undefined && this.state.unconfigured !== undefined)
        return (
            <div id="ModalCreate" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add Function</h4></div>
                        <div className="modal-body">
                            <form>
                                <ul className="list-group">
                                    Hardware ID:
                                    {
                                        <select id="unconfigured" name="unconfigured" onChange={this.onChangeSelection2}>
                                            {
                                                this.state.unconfigured.map((loc, index) => {
                                                    return <option value={loc.hardware_id}>{loc.hardware_id}</option>
                                                })
                                            }
                                        </select>
                                    }
                                    Name:
                                    <input defaultValue={this.state.name} onChange={this.onChangeName}></input>
                                    Max Distance:
                                    <input defaultValue={this.state.maxDistance} onChange={this.onChangeMaxDistance} type="number"></input>
                                    Location:
                                    {
                                        <select id="location" name="location" onChange={this.onChangeSelection}>
                                            {
                                                this.state.locations.map((loc, index) => {
                                                    return <option value={loc.id}>{loc.name}</option>
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

export default ModalCreate