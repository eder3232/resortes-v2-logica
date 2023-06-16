import { IEdge, IEdgesGetData } from "./edges";
import { IVertex, IVerticesGetData, IVerticesUtils } from "./vertices";

export class Spring {
    verticesUtils: IVerticesUtils
    dataVertices: Map<string, IVertex>
    dataEdges: Map<string, IEdge>


    settings: {
        verticesRestricted: number
        verticesUnrestricted: number
        verticesTotal: number

        dofForVertex: number
        lengthTableDOF: number
        isRestrictedAbove: boolean
    }

    utils: {
        orderOfDOF: {
            dof_internal: number
            isRestricted: boolean
            id: string
            dof_user: number
        }[]
        dofPointerInDataArray: Map<number, number>
    } = { orderOfDOF: [], dofPointerInDataArray: new Map() }

    constructor(edgesData: IEdgesGetData) {
        this.dataVertices = structuredClone(edgesData.verticesGetData.data)
        this.verticesUtils = structuredClone(edgesData.verticesGetData.utils)
        this.dataEdges = structuredClone(edgesData.edges)
        const dofForVertex = 1
        const u = this.verticesUtils.unrestrictedDOF
        const r = this.verticesUtils.restrictedDOF
        const t = this.verticesUtils.totalDOF

        this.settings = {
            dofForVertex: dofForVertex,
            lengthTableDOF: 2 * dofForVertex,
            verticesRestricted: this.verticesUtils.restrictedDOF,
            verticesUnrestricted: this.verticesUtils.unrestrictedDOF,
            verticesTotal: this.verticesUtils.totalDOF,
            isRestrictedAbove: true
        }
    }

    generateOrderDOf({ isRestrictedAbove }: { isRestrictedAbove: boolean }) {
        this.settings.isRestrictedAbove = isRestrictedAbove

        const dofDataRestricted: {
            id: string
            isRestricted: boolean
            dof_user: number
            dof_internal: number
        }[] = []

        const dofDataUnrestricted: {
            id: string
            isRestricted: boolean
            dof_user: number
            dof_internal: number
        }[] = []

        for (const [key, value] of this.dataVertices) {
            if (value.isRestricted) {
                dofDataRestricted.push({
                    id: value.id,
                    isRestricted: true,
                    dof_user: value.userDOF,
                    dof_internal: value.internalDOF
                })
            } else {
                dofDataUnrestricted.push({
                    id: value.id,
                    isRestricted: false,
                    dof_user: value.userDOF,
                    dof_internal: value.internalDOF
                })
            }
        }

        // reordenando para tratar de darle la forma que quiere el usuario
        dofDataRestricted.sort((a, b) => a.dof_user - b.dof_user)
        dofDataUnrestricted.sort((a, b) => a.dof_user - b.dof_user)
        if (isRestrictedAbove) {
            this.utils.orderOfDOF = [...dofDataRestricted, ...dofDataUnrestricted]
        } else {
            this.utils.orderOfDOF = [...dofDataUnrestricted, ...dofDataRestricted]
        }
        return this.utils.orderOfDOF
    }

    createDictionary() {
        this.utils.orderOfDOF.map((value, index) => {
            this.utils.dofPointerInDataArray.set(value.dof_internal, index)
        })
        return this.utils.dofPointerInDataArray
    }

}