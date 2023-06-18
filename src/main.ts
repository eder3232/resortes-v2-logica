import { spring1 } from "./examples/example1"
import { spring2 } from "./examples/example2"

function main() {
    // spring1.generateOrderDOf({ isRestrictedAbove: true })
    // console.log(spring1.createDictionary())

    spring2.generateOrderDOf({ isRestrictedAbove: false })
    spring2.createDictionary()
    spring2.generateLocals()
    spring2.generateData()
    spring2.buildGLobal()
    spring2.buildForces()
    spring2.buildDisplacement()
    spring2.splitGlobal()
    spring2.solveDisplacements()
    spring2.solveForces()
    spring2.buildNumericFandU()
    spring2.solveInternalForces()
}

main()