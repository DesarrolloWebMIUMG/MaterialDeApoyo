import Productos from '../Productos/Productos';
import Carrito from '../Carrito/Carrito';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Tienda(){
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
  
    const addToCart = (product) => {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
        setCart([...cart]);
      } else {
        const newProduct = { ...product, quantity: 1 };
        setCart([...cart, newProduct]);
      }
  
      setTotal(total + product.price);
    };
  
    const removeFromCart = (product) => {
      const existingItem = cart.find((item) => item.id === product.id);
  
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const updatedCart = cart.filter((item) => item.id !== product.id);
          setCart(updatedCart);
        }
        setTotal(total - product.price);
      }
    };
  
    const products = [
      {
        id: 1,
        name: 'Juego de llaves',
        price: 100,
        image: 'producto1.png',
      },
      {
        id: 2,
        name: 'Cortadora',
        price: 250,
        image: 'producto2.png',
      },
      {
        id: 3,
        name: 'Dado 1/2"',
        price: 30,
        image: 'producto3.png',
      },
      {
        id: 4,
        name: 'Juego de Herramientas',
        price: 3000,
        image: 'producto4.png',
      }
    ];
return(
    <div className="container">
        <div>
          <div className="row">
            {products.map((product) => (
              <Productos
                key={product.id}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>

          <Carrito items={cart} total={total} onRemoveFromCart={removeFromCart} />
        </div>

        
      </div>
);  
}

export default Tienda;