import controlMap, { Deferred } from "furmly-client";
import { Dynamic, componentWrapper } from "../src/components/Container";
import SubTitle from "./components/common/components/SubTitle";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandResultView,
  GridCommandsView
} from "./components/Grid";
import { TextView as ProcessTextView } from "./components/Process";
import { default as Provider } from "./components/Provider";
import View from "./components/View";
import Select from "./components/Select";
import Warning from "./components/common/components/Warning";
import Modal from "./components/common/components/Modal";
import ProgressBar from "./components/common/components/ProgressBar";
import { navigationActions } from "./components/common/utils";
import layoutWrapper from "./components/common/components/InnerComponentWrapper";
import FurmlyInput, {
  Checkbox as FurmlyCheckbox,
  DatePicker as FurmlyDatePicker
} from "./components/Input";

export default config => {
  const maps = controlMap();
  const container = new Deferred("container");
  //create component locator
  const componentLocator = maps.componentLocator(config && config.interceptors);

  maps.addCONTAINERRecipe([
    Dynamic,
    SubTitle,
    componentWrapper,
    componentLocator
  ]);

  //create view class.
  maps.addVIEWRecipe([View, Warning, container]);

  //create input class
  maps.addINPUTRecipe([
    layoutWrapper,
    FurmlyInput,
    FurmlyDatePicker,
    FurmlyCheckbox
  ]);

  //create select.
  maps.addSELECTRecipe([ProgressBar, layoutWrapper, Select]);

  maps.addGRIDRecipe([
    GridLayout,
    GridList,
    Modal,
    GridHeader,
    ProgressBar,
    GridCommandsView,
    navigationActions,
    GridCommandResultView,
    container
  ]);

  maps.addPROCESSRecipe([ProgressBar, ProcessTextView, new Deferred("view")]);

  return maps.cook();
};
