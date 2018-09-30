import controlMap from "furmly-client";
import FurmlyContainer from "../src/components/Container";
import SubTitle from "../src/common/components/SubTitle";

export default config => {
  const maps = { ...controlMap };
  //create component locator
  const componentLocator = maps.componentLocator(config.interceptors);
  //create default container
  const DefaultContainer = maps.CONTAINER(
    FurmlyContainer,
    SubTitle,
    componentLocator
  );
  //create view class.
  maps.VIEW = maps.VIEW(FurmlyView, Warning, DefaultContainer);
};
