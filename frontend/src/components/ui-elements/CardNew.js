import React from 'react';

class CardNew extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        let total = 0
        let battery = 0
        let full = 0
        this.props.data.map(col => {
            if (parseInt(this.props.room) === 0 || parseInt(col.location_id) === parseInt(this.props.room)) {
                if (parseInt((col.current_usage/col.max_distance)*100) > 90) full++
                if (parseInt((col.battery_voltage/4.2)*100) < 25) battery++
                total++
            }
        })
        this.setState({ total, battery, full });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.room !== this.props.room) {
            let total = 0
            let battery = 0
            let full = 0
            this.props.data.map(col => {
                if (parseInt(this.props.room) === 0 || parseInt(col.location_id) === parseInt(this.props.room)) {
                    if (parseInt((col.current_usage/col.max_distance)*100) > 90) full++
                    if (parseInt((col.battery_voltage/4.2)*100) < 25) battery++
                    total++
                }
            })
            this.setState({ total, battery, full });
        }
    }
    
    render() {
        return (
        <div className="card-group">
                                <div className="card border-right">
                                    <div className="card-body">
                                        <div className="d-flex d-lg-flex d-md-block align-items-center">
                                            <div>
                                                <div className="d-inline-flex align-items-center">
                                                    <h2 className="text-dark mb-1 font-weight-medium">{this.state.full}/{this.state.total}</h2>
                                                    <span className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">Is almost full</span>
                                                </div>
                                                <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Trash Bin Usage</h6>
                                            </div>
                                            <div className="ml-auto mt-md-3 mt-lg-0">
                                                <span className="opacity-7 text-muted"><i data-feather="percent" className="feather-icon"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-right">
                                    <div className="card-body">
                                        <div className="d-flex d-lg-flex d-md-block align-items-center">
                                            <div>
                                                <div className="d-inline-flex align-items-center">
                                                    <h2 className="text-dark mb-1 font-weight-medium">{this.state.battery}/{this.state.total}</h2>
                                                    <span className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">Need to be charged</span>
                                                </div>
                                                <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Battery Status</h6>
                                            </div>
                                            <div className="ml-auto mt-md-3 mt-lg-0">
                                                <span className="opacity-7 text-muted"><i data-feather="battery" className="feather-icon"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        )
    }
}

export default CardNew;