import React, { Component } from "react";
import axios from "axios";

class Articulos extends Component {
  state = {
    articulos: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/v1/article")
      .then(item => {
        console.log(item);
        this.setState({
            articulos: item.data
        })
      })
      .catch(err => {
        console.log(`Error: \n ${err}`);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Articulos component</h1>
{
    this.state.articulos.length
}
      </React.Fragment>
    );
  }
}

export default Articulos;
