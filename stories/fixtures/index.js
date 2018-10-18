export function getCommands() {
  return {
    visibility: true,
    title: "What would you like to do ?",
    commands: [
      {
        commandText: "Do some creative thing at the backend",
        commandIcon: "person",
        commandType: "BACKEND"
      },
      {
        commandText: "Write a cheque",
        commandIcon: "person",
        commandType: "WRITE_A_CHEQUE"
      },
      {
        commandText: "Cash a cheque",
        commandIcon: "person",
        commandType: "CHEQUE_CASHER"
      }
    ]
  };
}

export function getGridList() {
  const listProps = {
    items: []
  };
  for (let i = 1; i <= 23; i += 1) {
    listProps.items.push({
      firstName: "Person " + i,
      _id: i,
      middlename: "Chidi",
      surname: "Bond"
    });
  }
  listProps.total = listProps.items.length;
  return listProps;
}
export function getList(rowClicked, rowRemoved) {
  const listProps = {
    description: "This is a description",
    disabled: false,
    label: "Select something...",
    rowClicked,
    rowRemoved,
    items: [],
    selectedItems: {}
  };
  for (let i = 1; i <= 23; i += 1) {
    listProps.items.push({
      name: "Person " + i,
      _id: i,
      description: "This is why i'm hot",
      created: new Date().toLocaleDateString()
    });
  }
  listProps.total = listProps.items.length;
  return listProps;
}

export function getAddTemplate() {
  return [
    {
      elementType: "INPUT",
      args: {
        type: "text"
      },
      name: "name",
      label: "First Name",
      component_uid: "7089f0e4-0d22-4dd8-9c85-18768ba73054"
    },
    {
      elementType: "INPUT",
      name: "surname",
      label: "Surname",
      component_uid: "c9a6cd6e-b937-4710-90ee-80523ce91356"
    }
  ];
}
export function getComplexGrid() {
  return {
    items: getList().items,
    asyncValidators: [],
    validators: [],
    component_uid: "0925e37f-a48a-418d-a5cd-cf9569d5ad82",
    description: "This view lets administators manage processors",
    args: {
      filter: [
        {
          args: {
            config: { value: "b41a05b1-e2c8-46dc-87b6-772a1700c55e" },
            type: "PROCESSOR"
          },
          validators: [],
          description: "",
          asyncValidators: [],
          name: "gender",
          label: "Gender",
          elementType: "SELECT",
          component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e",
          items: [{ name: "something", _id: 1 }]
        },
        {
          validators: [],
          description: "",
          asyncValidators: [],
          name: "title",
          label: "Title",
          elementType: "INPUT",
          component_uid: "b41a05b1-e2c8-46dc-87b6-772a170cc55e"
        },
        {
          elementType: "INPUT",
          args: {
            type: "text"
          },
          name: "code",
          label: "Search for snippet",
          component_uid: "7089f0e4-0d22-4dd8-9c85-08768ba73054"
        },
        {
          elementType: "INPUT",
          name: "uid",
          label: "Unique ID",
          component_uid: "c9a6cd6e-b937-4710-98ee-80523ce91356"
        }
      ],
      commands: [],
      mode: "CRUD",
      gridArgs: '{"entityName":"_0Processor","entityLabel":"title"}',
      templateConfig:
        '{"name":"basic","config":{"title":"Title","description":"Description","_id":"ID"}}',
      extra: {
        createTemplate: [
          {
            validators: [],
            description: "",
            asyncValidators: [],
            name: "_id",
            label: "",
            elementType: "HIDDEN",
            component_uid: "b1ecba0c-5934-42bf-8ee8-166cc4ef8377"
          },
          {
            validators: [],
            description: "title of the processor",
            asyncValidators: [],
            args: {
              type: "text"
            },
            name: "title",
            label: "Enter Title",
            elementType: "INPUT",
            component_uid: "bdea2277-f04f-4126-a806-91cf43da9327"
          },
          {
            validators: [],
            description: "",
            asyncValidators: [],
            name: "code",
            label: "Enter Code",
            elementType: "SCRIPT",
            component_uid: "e4a2b238-48ed-44d5-81eb-4dfc440df1fd"
          },
          {
            validators: [],
            description: "",
            asyncValidators: [],
            args: {
              type: "checkbox"
            },
            name: "requiresIdentity",
            label: "Requires Identity",
            elementType: "INPUT",
            component_uid: "f768dfd5-cf25-4419-877b-970b09512740"
          },
          {
            validators: [],
            description: "",
            asyncValidators: [],
            args: {
              type: "password"
            },
            name: "password",
            label: "Password (Current User)",
            elementType: "INPUT",
            component_uid: "45572c9a-0f1c-4a31-8bcd-8ddc553d9713"
          },
          {
            validators: [],
            description: "",
            asyncValidators: [],
            args: {
              type: "checkbox"
            },
            name: "createClaim",
            label: "Create claim if it does not exist",
            elementType: "INPUT",
            component_uid: "9427a414-cbc0-4515-b046-f7e5a779093e"
          },
          {
            elementType: "INPUT",
            args: {
              type: "text"
            },
            name: "uid",
            label: "Unique ID",
            component_uid: "9db68bef-96a3-48aa-87ac-bc273452056c"
          },
          {
            elementType: "INPUT",
            args: {
              type: "checkbox"
            },
            name: "standalone",
            label: "Can run standalone ?",
            component_uid: "116ed60e-09a5-4cc4-bb46-689c194710b8"
          }
        ],
        editTemplate: [],
        createProcessor: "59aa7b4dd5faa4219026bab9",
        editProcessor: "59aa7b4dd5faa4219026bab9"
      },
      source: "59aa7b4dd5faa4219026bab1"
    },
    elementType: "GRID",
    label: "Manage Processors",
    name: "grid"
  };
}

export function getSimpleGrid() {
  return {
    asyncValidators: [],
    validators: [],
    args: {
      filter: [
        {
          validators: [{ validatorType: "REQUIRED" }],
          elementType: "INPUT",
          args: {
            type: "text"
          },
          name: "code",
          label: "Search for snippet",
          component_uid: "7089f0e4-0d22-4dd8-9c85-08768ba73054"
        },
        {
          validators: [],
          description: "",
          asyncValidators: [],
          args: {
            type: "password"
          },
          name: "password",
          label: "Password (Current User)",
          elementType: "INPUT",
          component_uid: "45572c9a-0f1c-4a31-8bcd-8ddc553d9713"
        },
        {
          validators: [],
          description: "",
          asyncValidators: [],
          args: {
            type: "checkbox"
          },
          name: "requiresIdentity",
          label: "Requires Identity",
          elementType: "INPUT",
          component_uid: "f768dfd5-cf25-4419-877b-970b09512740"
        },
        {
          elementType: "SELECT",
          args: {
            type: "PROCESSOR",
            config: {
              value: "59c027fdf0c3e43dcc70c4dd"
            }
          },
          name: "department",
          label: "Department",
          order: 1,
          component_uid: "3d997424-8e27-4164-8cc6-05a02412f472"
        }
      ],
      mode: "CRUD",
      templateConfig:
        '{\n    "name":"basic",\n    "config":{\n        "firstName":"First Name",\n        "middlename":"Middlename",\n        "surname":"Surname"\n    }\n}',
      extra: {
        editTemplate: [],
        fetchTemplateProcessor: "59bfb357fb766f1ff0c2adc0",
        fetchSingleItemProcessor: "59bfbb67fb766f1ff0c2adc3",
        editProcessor: "59c02947f0c3e43dcc70c4df"
      },
      source: "59bf231a3315c24ef080d369"
    },
    elementType: "GRID",
    label: "Clear Students",
    name: "grid",
    _id: "59c02c2ff0c3e43dcc70c4e1",
    component_uid: "745c0c25-546f-4e54-aa04-a1589186a6ae"
  };
}

export function getStep() {
  return {
    _id: "59bf14940774e451fcd2f0de",
    stepType: "CLIENT",
    mode: "VIEW",
    form: {
      elements: []
    }
  };
}

export function getSection() {
  return {
    args: {
      elements: [
        {
          validators: [],
          description: "Family name",
          asyncValidators: [],
          args: {
            type: "text"
          },
          name: "Surname",
          label: "Surname",
          elementType: "INPUT",
          component_uid: "bdea2277-f04f-4126-a806-91cf43da9327"
        },
        {
          validators: [],
          description: "",
          asyncValidators: [],
          name: "firstName",
          label: "First Name",
          elementType: "INPUT",
          component_uid: "e4a2b238-48ed-44d5-81eb-4dfc440df1fd"
        }
      ]
    },
    asyncValidators: [],
    validators: [],
    elementType: "SECTION",
    label: "Personal Details",
    description:
      "All confidential information provided by you is kept with utmost secrecy",
    name: "personalDetails",
    _id: "59c02c2ff0c3e43dcc70c4e1",
    component_uid: "745c0c25-546f-4e54-aa04-a1589186a6ae"
  };
}
export function runSelectProcessor() {
  return [
    {
      _id: "MALE",
      displayLabel: "Male"
    },
    {
      _id: "FEMALE",
      displayLabel: "Female"
    }
  ];
}

export function getProcess(id) {
  return {
    _id: id || "59bf14940774e451fcd2f0df",
    title: "Student Clearance",
    description: "Used by clearance officers to clear students",
    uid: "CLEAR_STUDENT",
    steps: []
  };
}
