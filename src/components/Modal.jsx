import { useState, useEffect } from 'react';
import cerrarbtn from '../img/cerrar.svg'
import { Mensaje } from "./Mensaje";

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('');

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    // funcion para llenar el modal con la informacion del objeto gastoEditar, en caso de que venga lleno
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])
    

    const ocultarModal = () => {

        // animacion del modal
        setAnimarModal(false);

        setGastoEditar({}); // limpiar el state del gasto editado

        // mostrar u ocultar modal
        setTimeout(() => {
            setModal(false);
        }, 1000);
    }

    const handleSubmit = e => {
        e.preventDefault();

        // validar todos los campos
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligarotios');

            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
        
    }

    return (
        <div className='modal'>
            <div className="cerrar-modal">
                <img src={cerrarbtn} alt="icono cerrar" onClick={ocultarModal} />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre gasto</label>    

                    <input type="text"
                        placeholder='Añade el nombre del gasto'
                        id='nombre' 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>    

                    <input type="number"
                        placeholder='Añade la cantidad del gasto'
                        id='cantidad'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>    

                    <select id="categoria"
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'}/>
            </form>
        </div>
    )
}
