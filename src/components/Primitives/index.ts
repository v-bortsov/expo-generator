import { Select } from './CustomPicker';
import { WeekDays } from './WeekDays';
// import InputSpinner from 'react-native-input-spinner';
import {Slider} from './Slider';
import {Input} from './TextInput';
import {TextArea} from './TextArea'
import {DatePicker} from './DatePicker'
import {Multislider} from './Multislider'
// export {Input} from './TextInput'
// export {Slider as InputNumber} from './Slider'
// export {Select} from './CustomPicker'
// export {TextArea} from './TextArea'
// export {WeekDays} from './WeekDays'
// export {DatePicker} from './DatePicker'
// export {Multislider} from './Multislider'
export default {
  Input, InputNumber: Slider/* InputSpinner */,  Select, TextArea, WeekDays, DatePicker , Multislider
}