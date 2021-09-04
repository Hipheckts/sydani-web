import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import View from "./View";
import Edit from "./Edit";
import ViewPost from "./ViewPost";

import swal from 'sweetalert';

import axios from "axios";
import $ from "jquery";


// Define App URL
axios.defaults.baseURL = 'https://sydani.evest.ng/app/api';
// axios.defaults.baseURL = 'http://localhost:8000/api';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
    }
  }

  render() {
      // }
    return (
      <Switch data="data">
        <div id="main">
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
              />
            )}
          />
          <Route
            path="/view"
            render={props => (
              <View
                {...props}
                logoutUser={this._logoutUser}
              />
            )}
          />
          <Route
            path="/view-post"
            render={props => (
              <ViewPost
                {...props}
                logoutUser={this._logoutUser}
              />
            )}
          />

          <Route
            path="/edit"
            render={props => (
              <Edit {...props}/>
            )}
          />
        </div>
      </Switch>
    );
  }
}

const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,

  document.getElementById("root")
);
