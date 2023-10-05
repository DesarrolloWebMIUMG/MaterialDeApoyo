import {useContexto} from '../Contexto/Contexto'


function Componente1(){
    const {arreglo, agregar} = useContexto();
    
    function cammbiarJuan(){
        agregar("Juan");
    }

    return(
        <div>
            <h1>Nuevo valores </h1>
            <button onClick={cammbiarJuan}> boton</button>
            {
            arreglo.map((item)=>(
                <h1>{item}</h1>
            ))
            }
        </div>
    );
}

export default Componente1;