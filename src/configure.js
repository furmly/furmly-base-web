import controlMap, { Deferred } from "furmly-client";
import { Dynamic, componentWrapper } from "../src/components/Container";
import SubTitle from "./components/common/components/SubTitle";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandResultView,
  GridCommandsView
} from "./components/Grid";
import HTMLView from "./components/HTMLView";
import Webview, { WebViewErrorText } from "./components/WebView";
import ActionViewLayout, { ActionViewFilter } from "./components/ActionView";
import SectionLayout, { Header as SectionHeader } from "./components/Section";
import { TextView as ProcessTextView } from "./components/Process";
import Page from "./components/Page";
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
import Image from "./components/Image";
import Label from "./components/Label";

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

  // this creates a furmly page.
  maps.createPage = (WrappedComponent, ...args) =>
    maps
      .PROVIDER(
        Page(WrappedComponent, config.loginUrl, config.homeUrl),
        ...args
      )
      .getComponent();

  return maps.cook();
};
