import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./assets/css/style.css";
import Header from "./partials/Header";
import HBook from "./assets/img/h-post.png";
import swal from "sweetalert";
import $ from "jquery";

var _name,
  _isbn,
  _authors,
  _country,
  _number_of_pages,
  _publisher,
  _release_date;

class Home extends React.Component {
  constructor(props) {
    super(props);
    // let { user } = this.props.appstate;
    this.state = {
      newbook: [],
      books: [],
      bookfireice: [],
      query: "",
      bookName: "A game of thrones",
    };
  }

  componentDidMount() {
    // alert(this.state.token);
    this.getBookFireIce();
    this.getBooks();
  }

  getBookFireIce() {
    axios
      .get(
        `${axios.defaults.baseURL}/external-book?name=${this.state.bookName}`
        // .get(`${axios.defaults.baseURL}/external-book?name=`+"A game of thrones"
      )
      .then((response) => {
        return response;
      })
      .then((json) => {
        if (json.data.status_code == 200) {
          console.log(json.data);
          this.setState({ bookfireice: json.data });
        } else alert("Cannot Fetch Books!");
      })
      .catch((error) => {
        console.error(`An Error Occured! ${error}`);
      });
  }

  getBookByName = (e) => {
    e.preventDefault();
    this.setState({
      query: e.target.value,
    });
    axios
      .get(`${axios.defaults.baseURL}/external-book?name=${this.state.query}`)
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((json) => {
        if (json.data.status_code == 200) {
          console.log(json.data);
          this.setState({ bookfireice: json.data });
        } else alert("Cannot Fetch Books!");
      })
      .catch((error) => {
        console.error(`An Error Occured! ${error}`);
      });
  };

  getBooks() {
    axios
      .get(`${axios.defaults.baseURL}/v1/books`)
      .then((response) => {
        return response;
      })
      .then((json) => {
        if (json.data.status_code == 200) {
          console.log(json.data.books);
          this.setState({ books: json.data.books });
        } else alert("Cannot Fetch Books!");
      })
      .catch((error) => {
        console.error(`An Error Occured! ${error}`);
      });
  }

  createBook = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("name", _name.value);
    formData.append("isbn", _isbn.value);
    formData.append("authors", _authors.value);
    formData.append("country", _country.value);
    formData.append("number_of_pages", _number_of_pages.value);
    formData.append("publisher", _publisher.value);
    formData.append("release_date", _release_date.value);

    console.log(formData);

    axios({
      method: "post",
      url: `${axios.defaults.baseURL}/v1/books`,
      data: formData,
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((json) => {
        if (json.data.status_code == 201) {
          swal("Book Created!", "success", {
            button: false,
            timer: 1500,
          });
          this.setState({
            newbook: json.data,
          });
        } else {
          swal("Alert!", "warning");
        }
      })
      .catch((error) => {
        swal("Warning!", "An Error Occured", "warning");
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="vertical-book-cards">
          <div className="v-scrolling-wrapper-flexbox">
            <h1>Requirement 1</h1>
            <div className="">
              Enter Name of Book
              <br />
              <input name="query" onChange={this.getBookByName} />
              <pre>
                <code>{JSON.stringify(this.state.bookfireice, null, 3)}</code>
              </pre>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="v-scrolling-wrapper-flexbox">
            <h1>Requirement 2</h1>
            <h3>1. Create Book</h3>
            <div className="">
              <form onSubmit={this.createBook} method="post">
                Enter Name of Book
                <br />
                <input ref={input => (_name = input)} name="name" />
                <br />
                Enter ISBN
                <br />
                <input ref={input => (_isbn = input)} name="isbn" />
                <br />
                Enter Authors
                <br />
                <input ref={input => (_authors = input)} name="authors" />
                <br />
                Enter Country
                <br />
                <input ref={input => (_country = input)} name="country" />
                <br />
                Enter Number of Pages
                <br />
                <input ref={input => (_number_of_pages = input)} name="number_of_pages" />
                <br />
                Enter Publisher
                <br />
                <input ref={input => (_publisher = input)} name="publisher" />
                <br />
                Enter Release Date
                <br />
                <input ref={input => (_release_date = input)} name="release_date" />
                <br />
                <button type="submit" class="btn btn-primary float-right">
                  Create Book
                </button>
                <br />
                <br />
              </form>
              <pre>
                <code>{JSON.stringify(this.state.newbook, null, 3)}</code>
              </pre>
            </div>
            <br />
            <br />
            <h3>2. All Books</h3>
            <div className="">
              <pre>
                <code>{JSON.stringify(this.state.books, null, 3)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
