import React, { Component } from 'react';
import Global from '../Global';

class Table extends Component {

    onButtonClicked = (i) => {
        Global.modal.onChange(i, this.props.data[i])
    }

    render() { 
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Name</th>
                            <th>Usage percentage</th>
                            <th>Battery</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((col, index) => {
                            if (parseInt(this.props.room) === 0 || parseInt(col.location_id) === parseInt(this.props.room))
                            return (
                                <React.Fragment>
                                    <tr>
                                        <td>{col.name}</td>
                                        <td>{parseInt((col.current_usage/col.max_distance)*100)}%</td>
                                        <td>{parseInt((col.battery_voltage/4.2)*100)}%</td>
                                        <td>
                                            <button 
                                                data-toggle="modal"
                                                data-target="#Modal"
                                                onClick={() => this.onButtonClicked(index)}
                                                type="button" className="btn btn-light" data-dismiss="modal" 
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                    {this.props.room == 0 && <button 
                        data-toggle="modal"
                        data-target="#ModalCreate"
                        // onClick={() => this.onButtonClicked(index)}
                        type="button" className="btn btn-light" data-dismiss="modal" 
                    >
                        Add
                    </button>}
                    
                </table>
            </div>
        );
    }
}
 
export default Table;