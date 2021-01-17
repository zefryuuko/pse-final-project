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
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                    <button 
                        data-toggle="modal"
                        data-target="#ModalCreate"
                        // onClick={() => this.onButtonClicked(index)}
                    >
                        Add
                    </button>
                </table>
            </div>
        );
    }
}
 
export default Table;