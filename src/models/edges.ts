import { IVerticesGetData } from "./vertices"

interface IInputEdge {
    id: string
    k: number
    from: string
    to: string
}

export interface IEdge {
    id: string
    k: number
    from: string
    to: string
}

export interface IEdgesGetData {
    edges: Map<string, IEdge>
    verticesGetData: IVerticesGetData
}

export class Edges {
    data = new Map<string, IEdge>()
    verticesGetData: IVerticesGetData

    constructor(verticesGetData: IVerticesGetData) {
        this.verticesGetData = verticesGetData
    }

    add({ id, k, to, from }: IInputEdge) {
        //Verificando si el id ya existe
        if (this.data.has(id)) {
            throw new Error(`La barra ${id} ya existe.`)
        }
        //Verificando si los nudos existen
        if (!this.verticesGetData.data.has(to)) {
            throw new Error(`El nudo "to" ${to} de la barra ${id} no existe.`)
        }
        if (!this.verticesGetData.data.has(from)) {
            throw new Error(`El nudo "from" ${from} de la barra ${id} no existe.`)
        }
        this.data.set(id, { id, k, to, from })
    }
    getData(): IEdgesGetData {
        return {
            edges: this.data,
            verticesGetData: this.verticesGetData
        }
    }
}