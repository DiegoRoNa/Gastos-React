import { useEffect, useState } from "react"


export const Filtros = ({filtro, setFiltro}) => {
    return (
        <div className="filtros sombra contenedor">
            <form action="">
                <div className="campo">
                    <label>Filtrar gastos</label>
                    <select name="" id="" value={filtro} onChange={e => setFiltro(e.target.value)}>
                        <option value="">-- Todas las categorías --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
