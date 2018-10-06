import controlMap from "furmly-client";
import FurmlyContainer, {
  Dynamic,
  componentWrapper
} from "../src/components/Container";
import SubTitle from "./components/common/components/SubTitle";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandResultView,
  GridCommandsView
} from "./components/Grid";
import View from "./components/View";
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
  //create component locator
  const componentLocator = maps.componentLocator(config && config.interceptors);
  //create default container
  const DefaultContainer = maps
    .CONTAINER(Dynamic, SubTitle, componentWrapper, componentLocator)
    .getComponent();

  //create view class.
  maps.VIEW = maps.VIEW(View, Warning, DefaultContainer).getComponent();

  //create input class
  maps.addRecipe("INPUT", [
    layoutWrapper,
    FurmlyInput,
    FurmlyDatePicker,
    FurmlyCheckbox
  ]);

  maps.addRecipe("GRID", [
    GridLayout,
    GridList,
    Modal,
    GridHeader,
    ProgressBar,
    GridCommandsView,
    navigationActions,
    GridCommandResultView,
    DefaultContainer
  ]);

  return maps.cook();
};
