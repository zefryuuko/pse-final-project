
import React from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: []
        }
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
        if (this.state.locations !== [])
        return (
            <aside className="left-sidebar" data-sidebarbg="skin6">
                {/* <!-- Sidebar scroll--> */}
                <div className="scroll-sidebar" data-sidebarbg="skin6">
                    {/* <!-- Sidebar navigation--> */}
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            {/* Dashboard */}
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/"
                                    aria-expanded="false"><i data-feather="home" className="feather-icon"></i><span
                                        className="hide-menu">Dashboard</span></Link></li>
                            <li className="list-divider"></li>

                            {/* Course Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Components</span></li>

                            <li className="sidebar-item"> <Link className="sidebar-link" to="/trash-bin"
                                    aria-expanded="false"><i data-feather="edit-3" className="feather-icon"></i><span
                                        className="hide-menu">Trash Bin</span></Link>
                            </li>

                            <li className="list-divider"></li>
                            <li className="nav-small-cap"><span className="hide-menu">Room</span></li>

                            {this.state.locations.map((room, index) => {
                                return (
                                    <React.Fragment>
                                        <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to={`/room/${room.id}`}
                                                aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                                    className="hide-menu">{room.name}</span></Link></li>
                                    </React.Fragment>
                                )
                            })}
                            <li className="list-divider"></li>

                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/logout"
                                    aria-expanded="false"><i data-feather="log-out" className="feather-icon"></i><span
                                        className="hide-menu">Logout</span></Link></li>
                        </ul>
                    </nav>
                    {/* <!-- End Sidebar navigation --> */}
                </div>
                {/* <!-- End Sidebar scroll--> */}
            </aside>
        );
        else return null
    }
}

export default Sidebar;