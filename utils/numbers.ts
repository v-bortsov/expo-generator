import { assoc, chain, times } from 'ramda'

export const random = chain(
  assoc('collect'),
  ({from, to, length}: any)=> times(
    ()=>Math.ceil(Math.random() * (to - from) + from),
    length
  )
)