import React, { Component } from "react";
import "../css/home.css";
import { Redirect } from "react-router-dom";
import registerImg from "../images/register.png";
import Footer from "./footer";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    const token = localStorage.getItem("token");
    if (token !== null) {
      loggedIn = true;
    }

    this.state = {
      id: "",
      email: "",
      password: "",
      loggedIn,
      emailErr: "",
      pwdErr: "",
      emailValidClass: "",
      pwdValidClass: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/check", {
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        if (res.data.value === 1) {
          this.setState({
            emailErr: res.data.msg,
            pwdErr: "",
            emailValidClass: "is-invalid",
            pwdValidClass: "",
          });
        } else if (res.data.value === 2) {
          this.setState({
            pwdErr: res.data.msg,
            emailErr: "",
            pwdValidClass: "is-invalid",
            emailValidClass: "",
          });
        } else if (res.data.value === 3) {
          localStorage.setItem("token", res.data.token);
          this.setState({ loggedIn: true });
        }
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/main" />;
    }
    return (
      <div>
        <div className="headSection">
          <h4>
            Employee Management <i class="fa fa-angle-double-down ml-1"></i>
          </h4>
        </div>
        <div className="mainSection">
          <div className="row no-gutters">
            <div className="col-lg-6 col-md-6 col-sm-6 leftSection">
              <img src={registerImg} alt="Img" className="img-fluid"></img>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 rightSection">
              <div className="formSection">
                <h4>Admin</h4>
                <hr></hr>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className={`form-control ${this.state.emailValidClass}`}
                      placeholder="xyz@gmail.com"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback">
                      {this.state.emailErr}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className={`form-control ${this.state.pwdValidClass}`}
                      placeholder="**********"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      required
                    />
                    <div className="invalid-feedback">{this.state.pwdErr}</div>
                  </div>
                  <button type="submit" className="btn">
                    Login <i className="fa fa-sign-in"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
