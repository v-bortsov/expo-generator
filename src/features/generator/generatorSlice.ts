import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { anyPass, append, assocPath, clone, cond, converge, ifElse, map, mergeRight, mergeWith, objOf, pathEq, pipe, pluck, propEq, reject, __ } from 'ramda'
import { ColumnType, GeneratorState, type, TypeLimiting } from '../../../react-app-env'
import { exampleFields } from '../../constants/Examples'
// import { dayOfWeekToDate, random, cartesianCondition, findAndMerge  } from '../../utils'
import { dayOfWeekToDate } from '../../utils/dates'
import { random } from '../../utils/numbers'
import { cartesianCondition, findAndMerge } from '../../utils/popular'

export const thunkCartesianCalc = createAsyncThunk(
  'rows/cartesian',
  async (
    _, store
  ): Promise<any>  => {
    const {columns, limiting} = store.getState().generator
    return cartesianCondition(
      map(
        pluck('value'),
        columns
      ),
      limiting
    )
    // store.dispatch(run(rows))
  }
)
export const initialState: GeneratorState = {
  columns: exampleFields,
  editColumn: null,
  rows: [],
  limiting: null,
  loading: false,
  format: 'json'
}
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
      state: GeneratorState, action: PayloadAction<any>
    ) => {
      state.editColumn = action.payload.name
    },
    createColumn: (
      state: GeneratorState, action: PayloadAction<ColumnType<null>>
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
      state: GeneratorState, action: PayloadAction<ColumnType<null>>
    ) => {
      state.columns = findAndMerge(
        state.columns,
        action.payload,
        'name'
      )
    },
    changeColumnByName: (
      state: GeneratorState, action: PayloadAction<{path: any[], value: any}>
    ) => {
      state.columns = assocPath(
        action.payload.path,
        action.payload.value,
        state.columns
      )
    },
    removeColumn: (
      state: GeneratorState, action: PayloadAction<ColumnType<null>>
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
      state: GeneratorState, action: PayloadAction<TypeLimiting>
    ) => {
      state.limiting = state.limiting===action.payload ? null : action.payload
    },
    loading: (
      state: GeneratorState, action: PayloadAction<boolean|undefined>
    ) =>{
      state.loading = action.payload
    },
    setFormat: (
      state: GeneratorState, action: PayloadAction<typeof type[number]>
    ) =>{
      state.format = action.payload
    },
    run: (
      state: GeneratorState, action: PayloadAction<any[]>
    ) => {
      state.rows = action.payload
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(thunkCartesianCalc.fulfilled, (state: GeneratorState, action: PayloadAction<any>) => {
      // Add user to the state array
      state.rows = action.payload
      state.loading = false
    }),
    builder.addCase(thunkCartesianCalc.pending, (state: GeneratorState, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = true
    })
  },
})
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }
export const { createColumn, removeColumn, changeColumnByName, changeColumn, run, setLimit, loading, editColumn } = generatorSlice.actions
export default generatorSlice.reducer
