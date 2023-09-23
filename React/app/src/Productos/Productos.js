import 'bootstrap/dist/css/bootstrap.min.css';
import './Productos.css'

function Productos(props) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card">
        <img src={props.image} className="card-img-top" alt={props.name} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">${props.price}</p>
          <button className="btn btn-primary" onClick={props.onAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productos