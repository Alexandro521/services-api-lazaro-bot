import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)

export let requireJson = (path)=> require(path)

const chistes = requireJson('./json/chistes.json')
const refranes = requireJson('./json/refranes.json')
const preguntas = requireJson('./json/preguntas.json')
const educativas = requireJson('./json/educativas.json')
const educativas2 = requireJson('./json/educativas2.json')
const frasesBonitas = requireJson('./json/frasesBonitas.json')
const frasesCitadas = requireJson('./json/frasesCitadas.json')
const frasesCortas = requireJson('./json/frasesCortas.json')
const frasesGraciosas = requireJson('./json/frasesGraciosas.json')

export {
   chistes,
    refranes,
    preguntas,
    educativas,
    educativas2,
    frasesBonitas,
    frasesCitadas,
    frasesCortas,
    frasesGraciosas
}