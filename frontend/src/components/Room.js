import React from 'react';

import axios from 'axios';

// UI Elements
import PageWrapper from './ui-elements/PageWrapper';
import PageBreadcrumb from './ui-elements/PageBreadcrumb';
import ContentWrapper from './ui-elements/ContentWrapper';
import Breadcrumb from './ui-elements/Breadcrumb';
import Card from './ui-elements/Card';
import Preloader from './ui-elements/Preloader';
import Table from './ui-elements/Table';
import Modal from './ui-elements/Modal';
import ModalCreate from './ui-elements/ModalCreate';
import CardNew from './ui-elements/CardNew';

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isAuthenticating: true,
            isAuthenticated: false,       // TODO: revalidate auth
            userFirstName: "Admin",
            userFirstFullName: "",
            userLastName: "",
            accountDetails: undefined,
            currentEnrolledSemester: undefined,
            // data: [
            //     {
            //       "hardware_id": "ESP-TEST00",
            //       "name": "Test Can 0",
            //       "max_distance": 20,
            //       "location_id": 1,
            //       "grafana_id": null,
            //       "current_usage": 3,
            //       "battery_voltage": 3.2
            //     },
            //     {
            //       "hardware_id": "ESP-TEST01",
            //       "name": "Test Can 1",
            //       "max_distance": 30,
            //       "location_id": 1,
            //       "grafana_id": null,
            //       "current_usage": 1,
            //       "battery_voltage": 4.2
            //     }
            //   ]
            data: undefined
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}
    }
    
    componentDidMount() {
        axios.get(`https://pse-api.zef.sh/bins`)
        .then(res => {
            // console.log(res.data)
            const data = res.data;
            this.setState({ data });
        })
    }
    
    render() {
        // if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        if (!this.state.data) return null
        else
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <Modal />
                    <ModalCreate />
                    <PageWrapper>
                        <PageBreadcrumb title={`Welcome Back, ${this.state.userFirstName}!`} breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                        <ContentWrapper>
                            <CardNew data={this.state.data} room={this.props.match.params.id}></CardNew>
                            <Card title="Trash table" padding style={{height: '70vh'}}>
                                <div className="list-group">
                                    <Table data={this.state.data} room={this.props.match.params.id}/>
                                    {/* {this.state.currentEnrolledSemester ?
                                        this.state.currentEnrolledSemester.classes.map((element, index) => {
                                            return <Link to={`/lecturer/courses/${this.state.currentEnrolledSemester._id}/${element.classCode}/${element.courseCode}`} key={index} className="list-group-item">
                                                <span className="mr-2">{element.metadata.name}</span> 
                                                <span className="badge badge-primary mr-1">{element.classType}</span>
                                                <span className="badge badge-secondary mr-1">{element.classCode}</span>
                                                <span className="badge badge-secondary mr-1">{element.courseCode}</span>
                                            </Link>
                                        })
                                    : <div style={{textAlign: "center"}}>No data</div>} */}
                                </div>
                            </Card>
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}

export default Room;