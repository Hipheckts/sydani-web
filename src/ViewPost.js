import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./assets/css/style.css";
import Header from "./partials/Header";

import swal from 'sweetalert';

class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    // let { user } = this.props.appstate;
    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.token
        : "",
      post: [],
      likes: 0
    };
  }

  componentDidMount() {
    var id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    // console.log(id);
    axios
      .get(`http://localhost:8000/api/v1/post/${id}`,
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
          this.setState({ 
              post: json.data.post,
              likes: json.data.post[0].likes,
            });
        } else alert("Cannot Fetch Data!");
      })
      .catch(error => {
        console.error(`An Error Occuredd! ${error}`);
      });
  }

  likePost = () => {

    var id = window.location.href.split('/')[window.location.href.split('/').length - 1];

    axios
    .get(`http://localhost:8000/api/v1/like/${id}`,
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
        this.setState({ likes: json.data.like[0] });
      } else alert("Error liking post!");
    })
    .catch(error => {
      console.error(`An Error Occured! ${error}`);
    });
    swal("", "You liked this post", "success", {
        button: false,
        timer: 1500,
      });
    }

  render() {
    return (
      <div>
        <Header/>
        <Link to="/">
          <span className="back">
            <svg className="back-button" xmlns="http://www.w3.org/2000/svg" width="21.544" height="19.267" viewBox="0 0 21.544 19.267">
              <g id="Group_73" data-name="Group 73" transform="translate(-317.057 -53.551)">
                <path id="Path_21" data-name="Path 21" d="M-4149.31,54.965l-8.22,8.22,8.22,8.22" transform="translate(4476)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"/>
                <path id="Path_22" data-name="Path 22" d="M-4157.529,61.315h19.13" transform="translate(4476 1.87)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"/>
              </g> 
            </svg> back
          </span>
        </Link>
        {this.state.post.map(post => (
        <div className="p-card" key={post.id}>
            {/* <span className="v-card-name"><span className="v-user-avatar"><img src={post.avatar} alt=""/></span><span className="v-card-u-name">{post.fname} {post.lname}</span><span className="v-card-title">{post.post}</span></span> */}
              <img src={post.image} alt="" onClick={this.likePost} className="p-card-img"/>
            <div className="post-action">
                <span>
                    <Link onClick={this.likePost}>
                      <span  className="action">
                        <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" width="21.581" height="18.76" viewBox="0 0 21.581 18.76">
                            <g id="_17" data-name="17" transform="translate(0 0)">
                                <g id="Group_17" data-name="Group 17" transform="translate(0)">
                                <path id="Path_4" data-name="Path 4" d="M35.965,32.1l-1.16,1.16-1.16-1.16a5.632,5.632,0,0,0-7.983,0h0a5.681,5.681,0,0,0,0,7.983L34.806,49.2l9.142-9.142a5.632,5.632,0,0,0,0-7.983h0A5.656,5.656,0,0,0,35.965,32.1Z" transform="translate(-24.025 -30.437)" fill="#7a8fa6"/>
                                </g>
                            </g>
                        </svg>
                    </span> <span  className="action-text">{this.state.likes}</span>
                    </Link>
                </span>
                <span>
                    <Link onClick={this.likePost}>
                      <span  className="action">
                        <svg className="action-icon" id="Group_16" data-name="Group 16" xmlns="http://www.w3.org/2000/svg" width="19.376" height="18.913" viewBox="0 0 19.376 18.913">
                        <g id="Group_15" data-name="Group 15">
                            <path id="Path_3" data-name="Path 3" d="M9.688,0C4.319,0,0,3.807,0,8.492A8.205,8.205,0,0,0,3.593,15.13L3.743,18.3c.028.592.436.785.909.432l2.613-1.947a9.8,9.8,0,0,0,2.422.244c5.369,0,9.688-3.807,9.688-8.492S15.057,0,9.688,0Z" fill="#7a8fa6"/>
                        </g>
                        </svg>
                    </span> <span  className="action-text">{this.state.likes}</span>
                    </Link>
                </span>
            </div>
          </div>
          ))}
      </div>
    );
  }
}

export default ViewPost;
