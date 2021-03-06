const random = x => `${x || ""}${+new Date().getTime()}${Math.random()}`;
export function getCommands() {
  return {
    visibility: true,
    title: "What would you like to do ?",
    commands: [
      {
        commandText: "Do some creative thing at the backend",
        commandIcon: "person",
        commandType: "PROCESSOR",
        command: {
          value: "3"
        }
      },
      {
        commandText: "Write a cheque",
        commandIcon: "person",
        commandType: "PROCESSOR",
        command: {
          value: "2"
        }
      },
      {
        commandText: "Cash a cheque",
        commandIcon: "person",
        commandType: "PROCESSOR",
        command: {
          value: "1"
        }
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
    selectedItems: {},
    getCommands: function() {
      return getCommands().commands;
    }
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
      name: "firstName",
      label: "First Name",
      component_uid: "7089f0e4-0d22-4dd8-9c85-18768ba73054"
    },
    {
      elementType: "INPUT",
      name: "surname",
      label: "Surname",
      component_uid: "c9a6cd6e-b937-4710-90ee-80523ce91356"
    },
    {
      name: "choice",
      label: "Properties (different ways of creating the same thing)",
      elementType: "SELECTSET",
      args: {
        path: "template",
        items: [
          {
            id: "Gui",
            displayLabel: "Designer",
            elements: [
              {
                name: "value",
                label: "Entity Template",
                elementType: "LIST",
                args: {
                  rowTemplate: JSON.stringify({
                    name: "expression",
                    config: {
                      exp: "{propertyName}"
                    }
                  }),
                  options: "TAG",
                  behavior: {
                    furmly_ref: "entitiesItemTemplate"
                  },
                  itemTemplate: [
                    {
                      name: "propertyName",
                      label: "Property Name",
                      elementType: "INPUT",
                      args: {},
                      description: "",
                      validators: [],
                      uid: null,
                      order: null,
                      component_uid: "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                      asyncValidators: []
                    },
                    {
                      name: "propertyType",
                      label: "Property Type",
                      elementType: "SELECTSET",
                      args: {
                        path: "props",
                        items: [
                          {
                            id: "String",
                            displayLabel: "String"
                          },
                          {
                            id: "Number",
                            displayLabel: "Number"
                          },
                          {
                            id: "Boolean",
                            displayLabel: "Boolean"
                          },
                          {
                            id: "Date",
                            displayLabel: "Date"
                          },
                          {
                            id: "Object",
                            displayLabel: "Object",
                            elements: [
                              {
                                name: "properties",
                                label: "Properties",
                                elementType: "LIST",
                                args: {
                                  itemTemplate: {
                                    template_ref: "entitiesItemTemplate"
                                  }
                                },
                                description: "",
                                validators: [],
                                uid: null,
                                order: null,
                                component_uid:
                                  "aa340d1f-e335-49ad-8985-301902e5505c",
                                asyncValidators: []
                              }
                            ]
                          },
                          {
                            id: "Array",
                            displayLabel: "Array",
                            elements: [
                              {
                                name: "properties",
                                label: "Of",
                                elementType: "LIST",
                                args: {
                                  options: "TAG",
                                  behavior: {
                                    furmly_ref: "arrayItemTemplate"
                                  },
                                  itemTemplate: [
                                    {
                                      name: "propertyType",
                                      label: "Property Type",
                                      elementType: "SELECTSET",
                                      args: {
                                        path: "props",
                                        items: [
                                          {
                                            id: "String",
                                            displayLabel: "String",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "Number",
                                            displayLabel: "Number",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "Boolean",
                                            displayLabel: "Boolean",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "Date",
                                            displayLabel: "Date",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "Object",
                                            displayLabel: "Object",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              },
                                              {
                                                name: "properties",
                                                label: "Properties",
                                                elementType: "LIST",
                                                args: {
                                                  itemTemplate: {
                                                    template_ref:
                                                      "entitiesItemTemplate"
                                                  }
                                                },
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "aa340d1f-e335-49ad-8985-301902e5505c",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "Array",
                                            displayLabel: "Array",
                                            elements: [
                                              {
                                                name: "propertyName",
                                                label: "Property Name",
                                                elementType: "INPUT",
                                                args: {},
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "06ba0816-96d2-4f7a-966a-8b198d400c3d",
                                                asyncValidators: []
                                              },
                                              {
                                                name: "properties",
                                                label: "Of",
                                                elementType: "LIST",
                                                args: {
                                                  options: "TAG",
                                                  behavior: {
                                                    furmly_ref:
                                                      "arrayItemTemplate"
                                                  },
                                                  itemTemplate: {
                                                    template_ref:
                                                      "arrayItemTemplate"
                                                  }
                                                },
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "e8fc91e1-6ae8-4dba-b781-dfee96440075",
                                                asyncValidators: []
                                              }
                                            ]
                                          },
                                          {
                                            id: "ObjectId",
                                            displayLabel:
                                              "Reference an existing Schema",
                                            elements: [
                                              {
                                                name: "ref",
                                                label: "Reference",
                                                elementType: "SELECT",
                                                args: {
                                                  type: "PROCESSOR",
                                                  config: {
                                                    value:
                                                      "5b676aec1613b58788d0b5c4"
                                                  }
                                                },
                                                description: "",
                                                validators: [],
                                                uid: null,
                                                order: null,
                                                component_uid:
                                                  "667aa406-9246-4c72-88ed-46c809c655fc",
                                                asyncValidators: []
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      description: "",
                                      validators: [],
                                      uid: null,
                                      order: null,
                                      component_uid:
                                        "b66b4ca0-8b6d-4041-867d-a512777cf300",
                                      asyncValidators: []
                                    }
                                  ]
                                },
                                description: "",
                                validators: [],
                                uid: null,
                                order: null,
                                component_uid:
                                  "e8fc91e1-6ae8-4dba-b781-dfee96440075",
                                asyncValidators: []
                              }
                            ]
                          },
                          {
                            id: "ObjectId",
                            displayLabel: "Reference an existing Schema",
                            elements: [
                              {
                                name: "ref",
                                label: "Reference",
                                elementType: "SELECT",
                                args: {
                                  type: "PROCESSOR",
                                  config: {
                                    value: "5b676aec1613b58788d0b5c4"
                                  }
                                },
                                description: "",
                                validators: [],
                                uid: null,
                                order: null,
                                component_uid:
                                  "667aa406-9246-4c72-88ed-46c809c655fc",
                                asyncValidators: []
                              }
                            ]
                          }
                        ]
                      },
                      description: "",
                      validators: [],
                      uid: null,
                      order: null,
                      component_uid: "b66b4ca0-8b6d-4041-867d-a512777cf300",
                      asyncValidators: []
                    }
                  ]
                },
                description: "",
                validators: [],
                uid: "CHIP_LIST",
                order: null,
                component_uid: "6c6591db-662f-49f8-880d-b0fd921a326b",
                asyncValidators: []
              }
            ]
          },
          {
            id: "Code",
            displayLabel: "Advanced (Direct Creation)",
            elements: [
              {
                name: "value",
                label: "Entity Template",
                elementType: "SCRIPT",
                args: {},
                description: "",
                validators: [],
                uid: null,
                order: null,
                component_uid: "fa8dec7e-1198-4dbb-b3d7-052829ed0f3e",
                asyncValidators: []
              }
            ]
          }
        ]
      },
      description: "",
      validators: [],
      uid: null,
      order: null,
      component_uid: "777d2d0d-c81c-4e2f-9fdd-ae9462d34e7a",
      asyncValidators: []
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
      commands: getCommands().commands,
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
          validators: [{ validatorType: "REQUIRED" }],
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
          validators: [{ validatorType: "REQUIRED" }],
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

export function getActionView() {
  return {
    args: {
      commandText: "SAVE",
      action: "save_processor",
      elements: [
        {
          validators: [{ validatorType: "REQUIRED" }],
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
          validators: [{ validatorType: "REQUIRED" }],
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
    elementType: "ACTIONVIEW",
    label: "Personal Details",
    description:
      "All confidential information provided by you is kept with utmost secrecy",
    name: "personalDetails",
    _id: "59c02c2ff0klndflkn3dcc70c4e1",
    component_uid: "745c0c25-546f-4e5-a04-a1589186a6ae"
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

export function runSaveActionProcessor() {
  return [
    {
      args: {
        config: { value: "59c027fdf0c3e43dcc70c4dd" },
        type: "PROCESSOR"
      },
      validators: [],
      description: "",
      asyncValidators: [],
      name: "gender",
      label: "Gender",
      elementType: "SELECT",
      component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e"
    }
  ];
}

export function webview(url) {
  return {
    args: {
      url: url || "https://chidionuekwusi.github.io/Twaija-web"
    },
    validators: [],
    description: "",
    asyncValidators: [],
    name: "webview",
    label: "Web View",
    elementType: "WEBVIEW",
    component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e"
  };
}

export function html(html_string) {
  return {
    args: {
      html:
        html_string ||
        "<div><h3>This is injected content from the backend!!!!!</h3></div>"
    },
    validators: [],
    description: "",
    asyncValidators: [],
    name: "htmlView",
    label: "Html View",
    elementType: "HTMLVIEW",
    component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e"
  };
}

export function label() {
  return {
    validators: [],
    description: "Every is just fine. This is the description.",
    asyncValidators: [],
    name: "htmlView",
    label: "This is a fantastic label bruh.",
    elementType: "LABEL",
    component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e"
  };
}

export function image({
  uid = "",
  type = "DATA",
  data = "data:image/png;base64,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"
} = {}) {
  return {
    args: {
      type,
      config: {
        data
      }
    },
    uid,
    validators: [],
    description: "",
    asyncValidators: [],
    name: random("image"),
    label: "Image View",
    elementType: "IMAGE",
    component_uid: random("b41a05b1-e2c8-46dc-87b6-772a1700c55")
  };
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
