import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Headeer = ({
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto, 
    gastos,
    setGastos
}) => {
    return (
        <header>
            <h1>Planificador de gastos</h1>

            {/**VALIDACION SI EL PRESUPUESTO ES VALIDO, CAMBIAR EL COMPONENTE*/}
            {isValidPresupuesto ? (
                <ControlPresupuesto presupuesto={presupuesto} 
                                    gastos={gastos} 
                                    setGastos={setGastos}
                                    setPresupuesto={setPresupuesto}
                                    setIsValidPresupuesto={setIsValidPresupuesto}
                ></ControlPresupuesto>
            ) : (
                <NuevoPresupuesto presupuesto={presupuesto} 
                                setPresupuesto={setPresupuesto}
                                setIsValidPresupuesto={setIsValidPresupuesto}>
                </NuevoPresupuesto>
            )}
     
        </header>
    )
}
