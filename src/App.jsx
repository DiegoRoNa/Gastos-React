import { useEffect } from 'react';
import { useState } from 'react'
import { Filtros } from './components/Filtros';
import { Headeer } from './components/Headeer'
import { ListadoGastos } from './components/ListadoGastos';
import { Modal } from './components/Modal';
import { generarID } from './helpers'
import iconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  
  // useEffect para leer si se va a editar un gasto
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 1000);
    }
  }, [gastoEditar])


  // useEffect para guardar en localstorage el presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  // useEffect para guardar en localstorage los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  // useEffect para filtrar
  useEffect(() => {

    // es necesario crear un array nuevo para no perder la referencia del array completo
    const gastosFiltradosCat = gastos.filter( gasto => gasto.categoria === filtro);
    setGastosFiltrados(gastosFiltradosCat);
  }, [filtro])

  // efecto para leer el Localstorage y validar si el presupuesto exise o esta en 0 y mostrar distintas pantallas
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  // funcion para mostrar el modal
  const handleNuevoGasto = () => {
    setModal(true);

    // vaciar el objeto de editar, para que el form aparezca vacio
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 1000);
  }

  // FUNCION PARA GUARDAR EL GASTO
  const guardarGasto = gasto => {

    if (gasto.id) {
      // editar el gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({}); // limpiar el state del gasto editado
    } else {
      // setear el nuevo gasto en el array
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }



    // animacion del modal
    setAnimarModal(false);

    // ocultar modal
    setTimeout(() => {
        setModal(false);
    }, 1000);
  }


  // funcion para eliminar un gasto
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Headeer presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}>
      </Headeer>

      {/**validar si el presupuesto es valido para colocar el icono de mas */}
      {isValidPresupuesto && (
        <>
        {/**apartado de gastos */}
        <main>
          <Filtros filtro={filtro} setFiltro={setFiltro}></Filtros>
          <ListadoGastos gastos={gastos} 
                          setGastoEditar={setGastoEditar} 
                          eliminarGasto={eliminarGasto}
                          gastosFiltrados={gastosFiltrados}
                          filtro={filtro}></ListadoGastos>
        </main>

        {/**apartado del boton +*/}
        <div className="nuevo-gasto">
          <img src={iconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
        </div>
        </>
        
      )}

      {/**componente de modal */}
      {modal && <Modal setModal={setModal} 
                      animarModal={animarModal} 
                      setAnimarModal={setAnimarModal}
                      guardarGasto={guardarGasto}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                ></Modal>}

    </div>
  )
}

export default App
