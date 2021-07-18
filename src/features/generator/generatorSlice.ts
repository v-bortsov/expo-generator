import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { anyPass, append, clone, cond, converge, evolve, ifElse, map, mergeRight, mergeWith, objOf, pathEq, pipe, pluck, prop, propEq, reject, split, tap, values, __ } from 'ramda'
import { ColumnType, GeneratorState, Nullable, TypeLimiting } from '../../../react-app-env'
import { exampleFields } from '../../constants/Examples'
import { RootState } from '../../store'
import { dayOfWeekToDate } from '../../utils/dates'
import { random } from '../../utils/numbers'
import { addParam, cartesianCondition, findAndMerge } from '../../utils/popular'

export const initialState: GeneratorState = {
  columns: exampleFields,
  editColumn: null,
  rows: [],
  limiting: null,
  loading: false
}
// const customType = addParam(
//   'collect',
//   pipe(
//     prop<any, any>('collect'),
//     split('\n')
//   ),
//   [clone]
// )
const customType = evolve({
  collect: {value: pipe(
    prop<any, any>('collect'),
    split('\n')
  )}
}) 
const bindTypeToHandler = cond([
  [
    propEq(
      'type',
      'dates'
    ), dayOfWeekToDate
  ], [
    propEq(
      'type',
      'integer'
    ), random
  ]
])
export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    editColumn: (
      state, action: PayloadAction<any>
    ) => {
      state.editColumn = action.payload.name
    },
    createColumn: (
      state, action: PayloadAction<ColumnType<null>>
    ) => {
      state.columns = pipe(
        ifElse(
          anyPass([
            pathEq(
              ['type', 'value'],
              'custom'
            ), pathEq(
              ['type', 'value'],
              'dictionary'
            )
          ]),
          clone,
          converge(
            mergeWith(mergeRight),
            [
              clone, pipe(
                pluck('value'),
                bindTypeToHandler,
                map(objOf('value'))
              )
            ]
          ),
        ),
        append(
          __,
          state.columns
        )
      )(action.payload)
    },
    changeColumn: (
      state: any, action: PayloadAction<ColumnType<null>>
    ) => {
      state.columns = findAndMerge(
        state.columns,
        action.payload,
        'name'
      )
    },
    removeColumn: (
      state, action: PayloadAction<ColumnType<null>>
    ) => {
      state.columns = reject(
        propEq(
          'name',
          action.payload.name
        ),
        state.columns
      )
    },
    setLimit: (
      state, action: PayloadAction<TypeLimiting>
    ) => {
      state.limiting = action.payload
    },
    loading: (
      state, action: PayloadAction<boolean|undefined>
    ) =>{
      state.loading = action.payload
    },
    run: (
      state, action: PayloadAction<any[]>
    ) => {
      state.rows = action.payload
      state.loading = false
    },
  }
})

export const { createColumn, removeColumn, changeColumn, run, setLimit, loading, editColumn } = generatorSlice.actions
// First, create the thunk
export const thunkCartesianCalc = createAsyncThunk(
  'rows/cartesian',
  async (
    _, store
  ): Promise<any[]>  => {
    
    store.dispatch(loading(true))
    const {columns, limiting} = store.getState().generator

    return  Promise.resolve(cartesianCondition(
      map(
        pluck('value'),
        columns
      ),
      limiting
    ))
  }
)
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.countevalue)`
export const selectColumns = (state: RootState) => state.generator.columns
export const selectRows = (state: RootState) => state.generator.rows
export const selectLimiting = (state: RootState) => state.generator.limiting
export const selectLoading = (state: RootState): boolean | undefined => state.generator.loading
export const selectEditColumn = (state: RootState): Nullable<string> => state.generator.editColumn

export default generatorSlice.reducer
