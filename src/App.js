import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Image, Nav, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/awsLib";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated});
  }

  handleLogout = event => {

    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login")
  }

  async componentDidMount() {
    try {
      if(await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };

  return (
    !this.state.isAuthenticating &&
    <div>
    <Navbar fluid collapseOnSelect className="top-bar">
         <Navbar.Header>
           <Navbar.Brand >
             <Link to="/"></Link>
           </Navbar.Brand>
           <Navbar.Toggle />
         </Navbar.Header>
         <Navbar.Collapse>
           <Nav pullRight>
           {this.state.isAuthenticated
             ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
             : [
               <RouteNavItem key={1} href="/signup">
          Signup
        </RouteNavItem>,
        <RouteNavItem key={2} href="/Login">
          Login
        </RouteNavItem>]},
        <RouteNavItem key={3} href="/features">Feautures</RouteNavItem>,
        <RouteNavItem key={4} href="/contactus">ContactUs</RouteNavItem>


           </Nav>
         </Navbar.Collapse>
       </Navbar>
      <div className="text-block">
      <div className="text-font">

      </div>
    </div>
     <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);