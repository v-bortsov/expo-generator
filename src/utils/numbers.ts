import { assoc, chain, times } from 'ramda'
import { OptionString } from '../../react-app-env'

export const random = chain(
  assoc('collect'),
  ({'from-to': fromTo, length}: OptionString)=> times(
    ()=>Math.ceil(Math.random() * (fromTo[1] - fromTo[0]) + fromTo[0]),
    length
  )
)