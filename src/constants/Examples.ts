export const exampleFields = [
  {
    type: {
      name: 'type',
      label: 'Type',
      rules: [['isEmpty', 'field is empty']],
      component: 'Select',
      options: [
        {
          label: 'Custom',
          value: 'custom'
        }, {
          label: 'Integer',
          value: 'integer'
        }, {
          label: 'Dates',
          value: 'dates'
        }, {
          label: 'Dictionary',
          value: 'dictionary'
        }
      ],
      defaultValue: null,
      value: 'custom'
    },
    name: {
      name: 'name',
      label: 'Name',
      rules: [['isEmpty', 'field is empty'], ['uniqNameByColumns', 'The name is not unique in the current scope']],
      component: 'Input',
      defaultValue: 'asdfasf',
      value: 'city'
    },
    label: {
      name: 'label',
      label: 'Label',
      rules: [['isEmpty', 'field is empty']],
      component: 'Input',
      defaultValue: null,
      value: 'city'
    },
    collect: {
      name: 'collect',
      label: 'Collect',
      rules: [['isEmpty', 'field is empty']],
      component: 'TextArea',
      defaultValue: null,
      rows: 4,
      value: ['msc', 'spb', 'ekt', 'sochi', 'vladik']
    }
  }
]
