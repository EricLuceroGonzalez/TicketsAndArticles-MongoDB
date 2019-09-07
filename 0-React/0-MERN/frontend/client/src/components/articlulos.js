import React, { Component } from "react";
import axios from "axios";
import Articulo from "./articulo";

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
        });
      })
      .catch(err => {
        console.log(`Error: \n ${err}`);
      });
  }

  renderArticulos = () => {
    if (this.state.articulos === 0) {
      return <h2> Cargando...</h2>;
    } else {
      const listaArticulos = this.state.articulos.map((item, i) => {
        return (
          <Articulo
            key={i}
            nombre={item.name}
            precio={item.price}
          ></Articulo>
        );
      });
      return listaArticulos;
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Articulos component</h1>
        {this.state.articulos.length}
        <div>{this.renderArticulos()}</div>
      </React.Fragment>
    );
  }
}

export default Articulos;
