import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'
import i18n from '../../localization'

export const initialState = i18n

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLocale: (
      state: any, action: PayloadAction<any>
    ) => {
      // const {i18n} = state
      // i18n.defaultLocale = action.payload.defaultLocale
      // i18n.locale = action.payload.locale
      // i18n.fallbacks = true
      state.i18n = mergeRight(
        state.i18n,
        action.payload
      )
    },
  }
})
export default i18nSlice.reducer