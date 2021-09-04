import React from "react";
import axios from "axios";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class View extends React.Component {
  constructor(props) {
    super(props);
    // let { user } = this.props.appstate;
    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.token
        : "",
      user: []
    };
  }

  componentDidMount() {
    var id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    // console.log(id);
    axios
      .get(`http://localhost:8000/api/v1/user/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.state.token}`
        }
      }
      )
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({ user: json.data.user });
        } else alert("Cannot Fetch Data!");
      })
      .catch(error => {
        console.error(`An Error Occuredd! ${error}`);
      });
  }

  render() {
    return (
      <div style={styles}>
        <h2>View User {"\u2728"}</h2>
        <ul>
        {this.state.user.map(user => (
            <ol
              style={{
                padding: 15,
                border: "1px solid #cccccc",
                width: 250,
                textAlign: "left",
                marginBottom: 15,
                marginLeft: "auto",
                marginRight: "auto"
              }}
              key={user.id}
              >
              <p>Name: {user.fname}</p>
              <p>Email: {user.email}</p>
              <img src={user.avatar} alt="User"/>
            </ol>
          ))}
        </ul>
        <button
          style={{ padding: 10, backgroundColor: "red", color: "white" }}
          onClick={this.props.logoutUser}
        >
          Logout{" "}
        </button>
      </div>
    );
  }
}

export default View;
