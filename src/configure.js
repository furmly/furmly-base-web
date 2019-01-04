import controlMap, { Deferred } from "furmly-client";
export { ThemeProvider } from "styled-components";
import { Dynamic, componentWrapper } from "../src/components/container";
import SubTitle from "./components/common/components/SubTitle";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandResultView,
  GridCommandsView
} from "./components/grid";
import HTMLView from "./components/htmlView";
import Webview, { WebViewErrorText } from "./components/webView";
import ActionViewLayout, { ActionViewFilter } from "./components/actionView";
import SectionLayout, { Header as SectionHeader } from "./components/section";
import { TextView as ProcessTextView } from "./components/Process";
import Page from "./components/Page";
import View from "./components/View";
import Select from "./components/select";
import Warning from "./components/common/components/Warning";
import ErrorText from "./components/common/components/ErrorText";
import Modal from "./components/common/components/Modal";
import ProgressBar from "./components/common/components/ProgressBar";
import { navigationActions } from "./components/common/utils";
import layoutWrapper from "./components/common/components/InnerComponentWrapper";
import List, {
  Layout as ListLayout,
  Button as ListButton
} from "./components/list";
import FurmlyInput, {
  Checkbox as FurmlyCheckbox,
  DatePicker as FurmlyDatePicker
} from "./components/Input";
import Image from "./components/Image";
import Label from "./components/Label";

export default (config = { providerConfig: [] }) => {
  const maps = controlMap();
  const container = new Deferred("container");
  //create component locator
  const componentLocator = maps.componentLocator(config.interceptor);

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

  //create list.
  maps.addLISTRecipe([
    ListLayout,
    ListButton,
    List,
    Modal,
    ErrorText,
    ProgressBar,
    container
  ]);
  //create grid
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

  maps.addSECTIONRecipe([SectionLayout, SectionHeader, container]);

  maps.addACTIONVIEWRecipe([
    ActionViewLayout,
    ProgressBar,
    ActionViewFilter,
    container
  ]);

  maps.addWEBVIEWRecipe([Webview, WebViewErrorText]);

  maps.addHTMLVIEWRecipe([HTMLView]);

  maps.addPROCESSRecipe([ProgressBar, ProcessTextView, new Deferred("view")]);

  maps.addPROVIDERRecipe([new Deferred("process"), ...config.providerConfig]);

  maps.addIMAGERecipe([Image]);

  maps.addLABELRecipe([Label]);

  maps.addSELECTSETRecipe([layoutWrapper, Select, ProgressBar, container]);

  // this creates a furmly page.
  maps.createPage = (WrappedComponent, ...args) =>
    maps._defaultMap
      .PROVIDER(
        Page(WrappedComponent, config.loginUrl, config.homeUrl).getComponent(),
        ...args
      )
      .getComponent();

  if (config.extend && typeof config.extend == "function")
    return config.extend(maps, maps._defaultMap);

  return maps.cook();
};
