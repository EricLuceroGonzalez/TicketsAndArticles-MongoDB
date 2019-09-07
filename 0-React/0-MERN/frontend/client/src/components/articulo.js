import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Articulo extends Component {
  state = {
    id: this.props.id,
    nombre: this.props.nombre,
    precio: this.props.precio
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-4 mt-2" style={{ margin: "20px auto" }}>
            <div className="card-body">
              <h5 className="card-title">{this.props.nombre}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                $ {this.props.precio}
              </h6>
              <p className="card-text">{this.props.id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Articulo;
