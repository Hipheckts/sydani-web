import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";

import swal from 'sweetalert';

const styles = {
  input: {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    padding: 15,
    float: "left",
    clear: "right",
    width: "80%",
    margin: 15
  },
  button: {
    height: 44,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    border: "none",
    backgroundColor: "red",
    margin: 15,
    float: "left",
    clear: "both",
    width: "85%",
    color: "white",
    padding: 15
  },
  link: {
    width: "100%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};

var _fname, _lname, _email, _phone, _password;

var id = window.location.href.split('/')[window.location.href.split('/').length - 1];


class Edit extends React.Component{
  constructor(props) {
    super(props);
    // let { user } = this.props.appstate;
    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.token
        : "",
      user: [],
      imageSource: '',
      file: null
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    // console.log(id);
    var id = window.location.href.split('/')[window.location.href.split('/').length - 1];

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
          this.setState({ user: json.data.user[0] });
        // } else alert("Cannot Fetch Data!");
        } else swal("Oops!", "Cannot Fetch Data!", "error");;
      })
      .catch(error => {
        console.error(`An Error Occured! ${error}`);
      });
      // alert(id)

  };

  handleLogin = e => {
    e.preventDefault();

    $("#email-login-btn")
    .attr("disabled", "disabled")
    .html(
      '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
    );

    var formData = new FormData();
    formData.append("fname", _fname.value);
    formData.append("lname", _lname.value);
    formData.append("email", _email.value);
    formData.append("phone", _phone.value);
    formData.append("avatar", this.state.file);
    formData.append("password", _password.value);

    console.log(formData);

  axios({
      method: 'post',
      url: `http://localhost:8000/api/v1/user/${id}`,
      data: formData,
      headers: {'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'multipart/form-data' }
      })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(json => {
      const { id, fname, lname, email, phone } = json.data.user;
      const { token } = json.data.token;
      let userData = {
        id,
        fname,
        lname,
        email,
        phone,
        token,
        timestamp: new Date().toString()
      };
      let appState = {
        isLoggedIn: true,
        user: userData
      };
      // save app state with user date in local storage
      localStorage["appState"] = JSON.stringify(appState);
      this.setState({
        isLoggedIn: appState.isLoggedIn,
        user: appState.user,
        token: appState.token
      });

      if (json.data.success === true) {
        swal("Updated!", "" + json.data.message, "success");
        // redirect home
        this.props.history.push("/");
      } else {
        // alert(json.data.message);
        swal("Alert!", "" + json.data.message, "warning");
        $("#email-login-btn")
          .removeAttr("disabled")
          .html("Update");
      }

    })
    .catch(error => {
      // alert("An Error Occured!" + error);
      console.log(error.response.data);
      if(error.response.data.message.fname === "") {
        swal("Warning!", "" + error.response.data.message.fname, "warning");
      } else{
        swal("Warning!", "Please fill all fields", "warning");
      }
      $("#email-login-btn")
        .removeAttr("disabled")
        .html("Update");
    });

  };

  // onChange(e) {
  //   this.setState({file:e.target.files[0]});
  // }

  uploadPhoto = e => {
    this.photoUpload.click();
  };

  onChange = event => {
    this.setState({ imageSource: '', imageData: '', file:event.target.files[0] });
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.setState({
          imageSource: event.target.result,
          imageData: file
        });
      };
    }
  };

  render() {
    $("#fname-input")
    .attr("value", this.state.user.fname);
    $("#lname-input")
    .attr("value", this.state.user.lname);
    $("#email-input")
    .attr("value", this.state.user.email);
    $("#phone-input")
    .attr("value", this.state.user.phone);
    $("#avatar-input")
    .attr("value", this.state.user.password);

    return (
      <div style={styles}>
      <h3 style={{ padding: 15 }}>Edit User</h3>
            <form id="login-form" action="" onSubmit={this.handleLogin} method="post">
            <input
              ref={input => (_fname = input)}
              style={styles.input}
              autoComplete="off"
              id="fname-input"
              name="fname"
              type="text"
              className="center-block"
              // placeholder={this.state.user.fname}
            />
            <input
              ref={input => (_lname = input)}
              style={styles.input}
              autoComplete="off"
              id="lname-input"
              name="lname"
              type="text"
              className="center-block"
              placeholder={this.state.user.lname}
            />
            <input
              ref={input => (_email = input)}
              style={styles.input}
              autoComplete="off"
              id="email-input"
              name="email"
              type="text"
              placeholder={this.state.user.email}
            />
            <input
              ref={input => (_phone = input)}
              style={styles.input}
              autoComplete="off"
              id="phone-input"
              name="phone"
              type="text"
              className="center-block"
              placeholder={this.state.user.phone}
            />
            <div onClick={this.uploadPhoto} className="uk-inline">
                <img
                  className=""
                  src={
                    this.state.imageSource
                      ? this.state.imageSource :
                      this.state.user.avatar ?
                      this.state.user.avatar
                      : null
                  }
                  alt="Alt"
                />
            </div>
            <input
              ref={input => (this.photoUpload = input)}
              onChange= {this.onChange}
              style={styles.input}
              autoComplete="off"
              id="avatar-input"
              name="avatar"
              type="file"
              className="center-block"
            />
            <input
              ref={input => (_password = input)}
              style={styles.input}
              autoComplete="off"
              id="password-input"
              name="password"
              type="password"
              className="center-block"
              placeholder="Enter new password or leave blank to maintain old password"
            />
            <button
              type="submit"
              style={styles.button}
              className="landing-page-btn center-block text-center"
              id="email-login-btn"
              href="#facebook"
            >
              Update
            </button>
            <Link style={styles.link} to="/">
              Home
            </Link>
          </form>
      </div>
    );
  }
}

export default Edit;
