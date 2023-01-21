import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from "../helpers"

import iconoAhorro from '../img/icono_ahorro.svg'
import iconoCasa from '../img/icono_casa.svg'
import iconoComida from '../img/icono_comida.svg'
import iconoGastos from '../img/icono_gastos.svg'
import iconoOcio from '../img/icono_ocio.svg'
import iconoSalud from '../img/icono_salud.svg'
import iconoSuscripciones from '../img/icono_suscripciones.svg'

// objeto para asociar el icono con la categoria
const diccionarioIconos = {
    ahorro: iconoAhorro,
    comida: iconoCasa,
    casa: iconoComida,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones
}

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

    const { nombre, cantidad, categoria, fecha, id } = gasto
    
    // funcion para mostrar texto y funcionabilidad al arrastar del lado izquierdo
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
        </LeadingActions>
    )

    // funcion para mostrar texto y funcionabilidad al arrastar del lado derecho
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>Eliminar</SwipeAction>
        </TrailingActions>
    )

    
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()} /**esta funcion es deslizar izquierda */
                trailingActions={trailingActions()} /**esta funcion es deslizar derecha */
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={diccionarioIconos[categoria]} alt="icono Gasto" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: <span> {formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>

                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
