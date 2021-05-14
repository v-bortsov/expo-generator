import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { anyPass, append, clone, cond, ifElse, map, mergeRight, pipe, prop, propEq, reject, split, __ } from 'ramda'
import { RootState } from '../../store'
import { ColumnType, GeneratorState, Nullable, TypeLimiting } from '../../react-app-env.d'
import { dayOfWeekToDate } from '../../utils/dates'
import { random } from '../../utils/numbers'
import { addParam, cartesianCondition, findAndMerge } from '../../utils/popular'
import { exampleFields } from '../../constants/Examples'

export const initialState: GeneratorState = {
  columns: exampleFields,
  editColumn: null,
  rows: [],
  limiting: null,
  loading: false
}
const customType = addParam(
  'collect',
  pipe(
    prop<any, any>('collect'),
    split('\n')
  ),
  [clone]
)

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
    clearEditColumn: (
      state, action: PayloadAction<ColumnType>
    ) => {
      state.editColumn = null
    },
    createColumn: (
      state, action: PayloadAction<ColumnType>
    ) => {
      state.columns = pipe<any, any, any>(
        ifElse(
          anyPass([
            propEq(
              'type',
              'custom'
            ), propEq(
              'type',
              'dictionary'
            )
          ]),
          customType,
          bindTypeToHandler
        ),
        append(
          __,
          state.columns
        )
      )(action.payload)
    },
    removeColumn: (
      state, action: PayloadAction<ColumnType>
    ) => {
      const name = action.payload.name
      state.columns = reject(
        propEq(
          'name',
          name
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
    changeColumn: (
      state: any, action: PayloadAction<ColumnType>
    ) => {
      state.columns = findAndMerge(
        state.columns,
        action.payload,
        'name'
      )
    }
  }
})

export const { createColumn, removeColumn, changeColumn, run, setLimit, loading, editColumn, clearEditColumn } = generatorSlice.actions
// First, create the thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (
    userId, store
  ) => {
    // store.dispatch(loading(true))
    const {columns, limiting} = store.getState().generator
    return  Promise.resolve(cartesianCondition(
      columns,
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
