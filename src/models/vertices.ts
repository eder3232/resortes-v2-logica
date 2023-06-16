
export interface IVertex {
    force: number
    displacement: number
    isRestricted: boolean
    id: string
    userDOF: number
    internalDOF: number
}

interface IInputVertex {
    force: number
    displacement: number
    isRestricted: boolean
    id: string
    userDOF: number
}

export interface IVerticesUtils {
    axisCoordinates: ReadonlyArray<'x'>
    restrictedDOF: number
    unrestrictedDOF: number
    totalDOF: number
}

export interface IVerticesGetData {
    data: Map<string, IVertex>
    utils: IVerticesUtils
}

export class Vertices {
    data = new Map<string, IVertex>()
    utils: IVerticesUtils = {
        axisCoordinates: ['x'],
        restrictedDOF: 0,
        unrestrictedDOF: 0,
        totalDOF: 0
    }

    add({ force, displacement, id, isRestricted, userDOF }: IInputVertex): void {

        // Verificar si el nudo existe
        if (this.data.has(id)) {
            throw new Error(`El nudo ${id} ya existe.`)
        }

        if (isRestricted) {
            this.utils.restrictedDOF++
            //Un nudo restringido no puede tener una fuerza aplicada
            if (force !== 0) {
                throw new Error(`El nudo ${id} no puede tener fuerza aplicada.`)
            }
            this.data.set(id, { force: 0, displacement, id, isRestricted: true, userDOF, internalDOF: this.utils.totalDOF })
        } else {
            //Un nudo no restringido no puede tener desplazamiento
            this.utils.unrestrictedDOF++
            if (displacement !== 0) {
                throw new Error(`El nudo ${id} no puede tener desplazamiento.`)
            }
            this.data.set(id, { force, displacement: 0, id, isRestricted: false, userDOF, internalDOF: this.utils.totalDOF })
        }
        this.utils.totalDOF++
    }
    getData(): IVerticesGetData {
        return { data: this.data, utils: this.utils }
    }
}
