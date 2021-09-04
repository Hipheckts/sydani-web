import React from "react";
import "../assets/css/style.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="top-nav">
          <span className="site-name">Sydani Assesment<span className="dot"></span></span>
      </div>
    );
  }
}
export default Home;
