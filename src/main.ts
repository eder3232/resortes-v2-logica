import { spring1 } from "./examples/example1"
import { spring2 } from "./examples/example2"

function main() {
    // spring1.generateOrderDOf({ isRestrictedAbove: true })
    // console.log(spring1.createDictionary())

    spring2.generateOrderDOf({ isRestrictedAbove: true })
    console.log(spring2.createDictionary())
}
main()