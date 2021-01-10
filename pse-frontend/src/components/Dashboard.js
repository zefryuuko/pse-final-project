import React from 'react';
import {Redirect, Link} from 'react-router-dom';

// UI Elements
import PageWrapper from './ui-elements/PageWrapper';
import PageBreadcrumb from './ui-elements/PageBreadcrumb';
import ContentWrapper from './ui-elements/ContentWrapper';
import Breadcrumb from './ui-elements/Breadcrumb';
import Card from './ui-elements/Card';
import Preloader from './ui-elements/Preloader';

class StaffDashboard extends React.Component {
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
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}
    }
    
    componentDidMount() {
        
    }
    
    render() {
        // if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title={`Welcome Back, ${this.state.userFirstName}!`} breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                        <ContentWrapper>
                            <Card title="Trash statistic" padding style={{height: '100vh'}}>
                                <div className="list-group">
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
                                <iframe src="https://grafana.zef.sh/d-solo/C_BqmQ-Gk/dashboard?orgId=1&theme=light&panelId=2" style={{width: '100%', height: '90vh'}} frameBorder="0"></iframe>
                            </Card>
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}

export default StaffDashboard;