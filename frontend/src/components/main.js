import React, { Component } from "react";
import "../css/main.css";
import Table from "./table";
import Footer from "./footer";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    let loggedIn = true;
    const token = localStorage.getItem("token");
    if (token === null) loggedIn = false;
    this.state = {
      _id: "",
      Name: "",
      Email: "",
      Salary: "",
      employees: [],
      toggle: false,
      token,
      loggedIn,
      searchValue: "",
      emailErr: "",
      validClass: "",
    };
  }

  handleDelete = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "user-token": this.state.token,
      },
    };

    axios
      .delete(`/api/delete/${id}`, config)
      .then((res) => {
        this.componentDidMount();
      })
      .catch((err) => {
        throw err;
      });
  };

  componentDidMount() {
    axios
      .get("/api/view")
      .then((res) => {
        this.setState({ employees: res.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/api/update/${this.state._id}`, {
        Name: this.state.Name,
        Email: this.state.Email,
        Salary: this.state.Salary,
      })
      .then((res) => {
        this.componentDidMount();
        this.setState({ toggle: !this.state.toggle });
        this.setState({
          _id: "",
          Name: "",
          Email: "",
          Salary: "",
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/insert", {
        Name: this.state.Name,
        Email: this.state.Email,
        Salary: this.state.Salary,
      })
      .then((res) => {
        if (res.data.status === "true") {
          this.setState({
            employees: [...this.state.employees, res.data.employee],
          });
          this.setState({
            Name: "",
            Email: "",
            Salary: "",
            emailErr: "",
            validClass: "",
          });
        } else {
          this.setState({
            emailErr: "Employee already exists with this email",
            validClass: "is-invalid",
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  changeToggle = (id) => {
    this.setState({ toggle: !this.state.toggle });
    fetch(`/api/profile/${id}`, {
      method: "post",
    })
      .then((res) => res.json())
      .then((res2) => {
        this.setState({
          _id: res2.emp._id,
          Name: res2.emp.Name,
          Email: res2.emp.Email,
          Salary: res2.emp.Salary,
        });
      });
  };

  mainForm = () => {
    return (
      <div>
        <div className="content collapse" id="fo">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    required
                    placeholder="Employee name"
                    value={this.state.Name}
                    onChange={(e) => this.setState({ Name: e.target.value })}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    name="Salary"
                    required
                    value={this.state.Salary}
                    placeholder="Employee salary"
                    onChange={(e) => this.setState({ Salary: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className={`form-control ${this.state.validClass}`}
                name="Email"
                required
                value={this.state.Email}
                placeholder="Employee email"
                onChange={(e) => this.setState({ Email: e.target.value })}
              />
              <div className="invalid-feedback">{this.state.emailErr}</div>
            </div>

            <button className="btn" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  };

  editForm = () => {
    return (
      <div>
        <div className="content collapse" id="fo">
          <form onSubmit={this.handleUpdate}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    placeholder="Employee name"
                    value={this.state.Name}
                    onChange={(e) => this.setState({ Name: e.target.value })}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    name="Salary"
                    value={this.state.Salary}
                    placeholder="Employee salary"
                    onChange={(e) => this.setState({ Salary: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="form-control"
                name="Email"
                value={this.state.Email}
                placeholder="Employee email"
                onChange={(e) => this.setState({ Email: e.target.value })}
              />
            </div>

            <button className="btn" type="submit">
              Save
            </button>
          </form>
        </div>
        <br></br>
      </div>
    );
  };

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark">
            <form>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={this.state.searchValue}
                onChange={(e) => {
                  this.setState({ searchValue: e.target.value });
                }}
              />
            </form>
            <Link to="/logout">
              <button className="btn" type="submit">
                Logout<i class="fa fa-sign-out ml-2"></i>
              </button>
            </Link>
          </nav>
        </header>
        <div className="container listdemo">
          <ul className="list-group">
            <a
              href="#fo"
              className="list-group-item list-group-item-action"
              data-toggle="collapse"
            >
              Add Employee Details <i class="fa fa-plus ml-1"></i>
            </a>
          </ul>
          {!this.state.toggle ? this.mainForm() : this.editForm()}
          <br></br>
          <Table
            user={this.state.employees}
            delete={this.handleDelete}
            edit={this.handleUpdate}
            change={this.changeToggle}
            val={this.state.toggle}
            search={this.state.searchValue}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
