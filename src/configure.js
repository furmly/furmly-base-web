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
import { TextView as ProcessTextView, Layout } from "./components/Process";
import View from "./components/View";
import Select from "./components/select";
import Warning from "./components/common/components/Warning";
import ErrorText from "./components/common/components/ErrorText";
import Modal from "./components/common/components/Modal";
import ProgressBar from "./components/common/components/ProgressBar";
import layoutWrapper from "./components/common/components/InnerComponentWrapper";
import List, {
  Layout as ListLayout,
  Button as ListButton,
  Confirmation,
  ChipList
} from "./components/list";
import FurmlyInput, {
  Checkbox as FurmlyCheckbox,
  DatePicker as FurmlyDatePicker
} from "./components/Input";
import Image from "./components/Image";
import Label from "./components/Label";
import FileUpload, { Previews } from "./components/file_upload";
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
    Confirmation,
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
    GridCommandResultView,
    container
  ]);

  //create section
  maps.addSECTIONRecipe([SectionLayout, SectionHeader, container]);

  //create actionview
  maps.addACTIONVIEWRecipe([
    ActionViewLayout,
    ProgressBar,
    ActionViewFilter,
    container
  ]);

  //create webview
  maps.addWEBVIEWRecipe([Webview, WebViewErrorText]);

  //create htmlview
  maps.addHTMLVIEWRecipe([HTMLView]);

  //create process
  maps.addPROCESSRecipe([
    ProgressBar,
    ProcessTextView,
    new Deferred("view"),
    Layout
  ]);

  //create provider
  maps.addPROVIDERRecipe([new Deferred("process"), ...config.providerConfig]);

  //create image
  maps.addIMAGERecipe([Image]);

  //create label
  maps.addLABELRecipe([Label]);

  //create fileupload
  maps.addFILEUPLOADRecipe([
    FileUpload,
    ProgressBar,
    props => props.children,
    Previews
  ]);

  //create selectset
  maps.addSELECTSETRecipe([layoutWrapper, Select, ProgressBar, container]);

  //create chip_list
  maps.addRecipe(
    "CHIP_LIST",
    [
      ListLayout,
      ListButton,
      ChipList,
      Modal,
      ErrorText,
      ProgressBar,
      Confirmation,
      container
    ],
    maps.LIST
  );

  if (config.extend && typeof config.extend == "function")
    return config.extend(maps, maps._defaultMap, Deferred);

  return maps.cook();
};
