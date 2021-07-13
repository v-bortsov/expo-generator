// import { InputItem, TextareaItem } from '@ant-design/react-native';
// import DatePicker from '@dietime/react-native-date-picker';
import { Select } from './CustomPicker';
import { WeekDays } from './WeekDays';
import InputSpinner from 'react-native-input-spinner';
import {Input} from './TextInput';
import {TextArea} from './TextArea'
import {DatePicker} from './DatePicker'

export default {
  Input, InputNumber: InputSpinner, Select, TextArea, WeekDays, DatePicker 
}