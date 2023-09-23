import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Carrito.css'

class Carrito extends Component {
    render() {
      const cartItems = this.props.items.map((item) => (
        <ListGroup className="lista-carrito">
            <ListGroup.Item key={item.id}>{item.name} - Q {item.price} x {item.quantity}
            <button
            className="btn btn-danger ml-2 button-borrar"
            onClick={() => this.props.onRemoveFromCart(item)}
          >
            Eliminar
          </button>
            </ListGroup.Item>
        </ListGroup>
        
      ));
  
      return (
        <div className="cart">
          <h2>Carrito de compras</h2>
          <ul>{cartItems}</ul>
          <h2>Total: Q {this.props.total}</h2>
        </div>
      );
    }
  }

  export default Carrito;