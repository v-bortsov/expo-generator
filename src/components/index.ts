import { InputItem, TextareaItem } from '@ant-design/react-native';
import DatePicker from '@dietime/react-native-date-picker';
import { Select } from './CustomPicker';
import { WeekDays } from './WeekDays';
import InputSpinner from 'react-native-input-spinner';

export default {
  Input: InputItem, InputNumber: InputSpinner, DatePicker,  Select, TextArea: TextareaItem, WeekDays
}