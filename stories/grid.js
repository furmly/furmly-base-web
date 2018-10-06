import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";
import { reducers as furmly_reducers } from "furmly-client";
import { createStore, combineReducers } from "redux";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandsView
} from "../src/components/Grid";
import Input from "../src/components/Input";
import { userProps } from "./input";
import configure from "../src/configure";

const itemClicked = action("itemClicked");
const itemRemoved = action("itemRemoved");
const done = action("done");
const execCommand = action("execCommand");
const commandsProps = {
  visibility: true,
  title: "What would you like to do ?",
  done,
  execCommand,
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
const listProps = {
  description: "This is a description",
  disabled: false,
  label: "Select something...",
  rowClicked: itemClicked,
  rowRemoved: itemRemoved,
  items: []
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
const rowTemplate = {
  name: "expression",
  config: {
    exp: "My name is {name} and my ID is {_id}"
  }
};
const layoutProps = {
  value: "To do list",
  description: "This is what i want to do with my life"
};

const gridProps = {
  asyncValidators: [],
  validators: [],
  component_uid: "0925e37f-a48a-418d-a5cd-cf9569d5ad82",
  description: "This view lets administators manage processors",
  args: {
    filter: [
      {
        args: { processor: "ascfkajenfkjeabkajb" },
        validators: [],
        description: "",
        asyncValidators: [],
        name: "gender",
        label: "Gender",
        elementType: "SELECT",
        component_uid: "b41a05b1-e2c8-46dc-87b6-772a1700c55e"
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
storiesOf("Grid", module)
  .add("List only", () => <GridList {...listProps} />)
  .add("Header only", () => (
    <GridHeader>
      <Input {...userProps} />
    </GridHeader>
  ))
  .add("CommandView only", () => <GridCommandsView {...commandsProps} />)
  .add("Full", () => {
    const controls = configure();
    const { GRID } = controls;
    const store = createStore(combineReducers({ furmly: furmly_reducers }));
    return (
      <Provider store={store}>
        <GRID {...gridProps} />
      </Provider>
    );
  });
