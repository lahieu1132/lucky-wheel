import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/Home";
import BoardPrize from "./components/BoardPrize";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  
  componentDidMount () {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role.includes("ADMIN"),
        showAdminBoard: user.role.includes("USER"),
      });

      
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {

    return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={ <BoardAdmin /> }>
              <Route path="/admin/users" element={<BoardUser />} />
              <Route path="/admin/prize" element={<BoardPrize />} />
              {/* <Route path="/admin/award" element={<BoardModerator />} /> */}
            </Route>
          </Routes>
    );
  }
}

export default App;

const AdminReject = () => <h1>Bạn không có quyền vào trang admin <Link to='/login'>đăng nhập</Link></h1>;

