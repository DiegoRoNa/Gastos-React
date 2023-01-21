import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2'

export const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    // calcular lo disponible y lo gastado
    useEffect(() => {
        /**EL METODO reduce, ACUMULA MUCHA INFORMACION EN UNA VARIABLE
         * HITERAMOS EL ARREGLO Y TOMA EL PARAMETRO DEL ACUMULADO Y EL ELEMENTO HITERADO
         * RETORNAMOS LA CANTIDAD DEL ELEMENTO Y LA SUMAMOS AL TOTAL
         * EL 0, INDICA EN QUE ELEMENTO DEL ARRAY VA A INICIAR
         */
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1500);
        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos])

    const formatearCantidad = cantidad => {

        // toLocaleString ESTA ES UNA API NATIVA DE JS PARA RESETEAR CANTIDADES EN MONEDA
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    // funcion para limpiar app
    const handleResetApp = () => {
        Swal.fire({
            title: '¿Seguro que quieres resetear el presupueto?',
            text: "Ya no volverás a ver tus gastos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, resetear',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setGastos([]);
                setPresupuesto(0);
                setIsValidPresupuesto(false);
            }
        })
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                ></CircularProgressbar>
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>Limpiar presupuesto</button>
                <p><span>Presupuesto:</span> {formatearCantidad(presupuesto)}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible:</span> {formatearCantidad(disponible)}</p>
                <p><span>Gastado:</span> {formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}
