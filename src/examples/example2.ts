import { Edges } from '../models/edges'
import { Spring } from '../models/spring'
import { Vertices } from '../models/vertices'

const vertices2 = new Vertices()

vertices2.add({ force: 0, displacement: 0, id: 'v4', isRestricted: true, userDOF: 1 })
vertices2.add({ force: 0, displacement: 0, id: 'v5', isRestricted: true, userDOF: 2 })
vertices2.add({ force: 5, displacement: 0, id: 'v1', isRestricted: false, userDOF: 3 })
vertices2.add({ force: 4, displacement: 0, id: 'v2', isRestricted: false, userDOF: 4 })
vertices2.add({ force: 0, displacement: 0, id: 'v3', isRestricted: false, userDOF: 5 })

const edges2 = new Edges(vertices2.getData())

edges2.add({ id: 'e1', from: 'v4', to: 'v2', k: 10 })
edges2.add({ id: 'e2', from: 'v2', to: 'v3', k: 4 })
edges2.add({ id: 'e3', from: 'v3', to: 'v5', k: 3 })
edges2.add({ id: 'e4', from: 'v2', to: 'v1', k: 8 })

const spring2 = new Spring(edges2.getData())

export { spring2 }
