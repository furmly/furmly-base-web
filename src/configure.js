import controlMap from "furmly-client";
import FurmlyContainer, { componentWrapper } from "../src/components/Container";
import SubTitle from "../src/common/components/SubTitle";
import GridList, { GridHeader, GridLayout } from "../src/components/Grid";

export default config => {
  const maps = controlMap();
  //create component locator
  const componentLocator = maps.componentLocator(config.interceptors);
  //create default container
  const DefaultContainer = maps.CONTAINER(
    FurmlyContainer,
    SubTitle,
    componentWrapper,
    componentLocator
  );
  //create view class.
  maps.VIEW = maps.VIEW(FurmlyView, Warning, DefaultContainer);

  maps.addRecipe("GRID", [
    GridLayout,
    GridList,
    ItemView,
    GridHeader,
    ProgressBar,
    CommandsView,
    NavigationActions,
    CommandResultView,
    Container
  ]);
};
