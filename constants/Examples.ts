export const exampleFields = [
  {
    type: {
      name: 'type',
      label: 'Type',
      rules: [
        {
          required: true,
          message: 'Missing type'
        }
      ],
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
      rules: [
        {
          required: true
        }
      ],
      component: 'Input',
      defaultValue: 'asdfasf',
      value: 'city'
    },
    label: {
      name: 'label',
      label: 'Label',
      rules: [
        {
          required: true
        }
      ],
      component: 'Input',
      defaultValue: null,
      value: 'city'
    },
    collect: {
      name: 'collect',
      label: 'Collect',
      rules: [
        {
          required: true
        }
      ],
      component: 'TextArea',
      defaultValue: null,
      rows: 4,
      value: ['msc', 'spb', 'ekt', 'sochi', 'vladik']
    }
  }
]
