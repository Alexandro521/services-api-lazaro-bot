
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)

export let requireJson = (path)=> require(path)
