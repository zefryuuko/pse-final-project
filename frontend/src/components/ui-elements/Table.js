import React, { Component } from 'react';

class Table extends Component {
    render() { 
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Name</th>
                            <th>Usage percentage</th>
                            <th>Battery</th>
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
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Table;