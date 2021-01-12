import React, { Component } from "react";
import "../css/table.css";

class Table extends Component {
  render() {
    var filteredUser = this.props.user.filter((emp) => {
      return emp.Name.toLowerCase().includes(this.props.search.toLowerCase());
    });
    var dummy = this.props.user;

    function check() {
      if (dummy.length === 0) {
        return <td colSpan="4"> No records are available</td>;
      } else if (filteredUser.length === 0) {
        return <td colSpan="4"> Employee Not Found</td>;
      }
    }

    return (
      <div>
        <div className="">
          <table className="table table-hover table-bordered table-responsive-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.Name}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.Salary}</td>
                  <td>
                    <button
                      className="btn btn-info ml-2"
                      onClick={() => this.props.change(employee._id)}
                      disabled={this.props.val}
                    >
                      Edit<i className="fa fa-pencil ml-2"></i>
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => this.props.delete(employee._id)}
                      disabled={this.props.val}
                    >
                      Delete<i className="fa fa-times ml-2"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr>{check()}</tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
