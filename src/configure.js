import controlMap from "furmly-client";
import FurmlyContainer, { componentWrapper } from "../src/components/Container";
import SubTitle from "./components/common/components/SubTitle";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandResultView,
  GridCommandsView
} from "./components/Grid";
import Warning from "./components/common/components/Warning";
import Modal from "./components/common/components/Modal";
import ProgressBar from "./components/common/components/ProgressBar";
import { navigationActions } from "./components/common/utils";

export default config => {
  const maps = controlMap();
  //create component locator
  const componentLocator = maps.componentLocator(config && config.interceptors);
  //create default container
  const DefaultContainer = maps.CONTAINER(
    FurmlyContainer,
    SubTitle,
    componentWrapper,
    componentLocator
  );
  //create view class.
  maps.VIEW = maps.VIEW(
    props => <div>{props.children}</div>,
    Warning,
    DefaultContainer
  );

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
