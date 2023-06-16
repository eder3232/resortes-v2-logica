import { Edges } from '../models/edges'
import { Spring } from '../models/spring'
import { Vertices } from '../models/vertices'

const vertices1 = new Vertices()

vertices1.add({ force: 0, displacement: 0, id: 'v1', isRestricted: true, userDOF: 1 })
vertices1.add({ force: -4, displacement: 0, id: 'v2', isRestricted: false, userDOF: 2 })
vertices1.add({ force: -8, displacement: 0, id: 'v3', isRestricted: false, userDOF: 3 })
vertices1.add({ force: 20, displacement: 0, id: 'v4', isRestricted: false, userDOF: 4 })

console.log(vertices1)

const edges1 = new Edges(vertices1.getData())

edges1.add({ id: 'e1', from: 'v1', to: 'v2', k: 10 })
edges1.add({ id: 'e2', from: 'v2', to: 'v3', k: 8 })
edges1.add({ id: 'e3', from: 'v3', to: 'v4', k: 12 })

const spring1 = new Spring(edges1.getData())

export { spring1 }
