import Select from "./Select";
import { inputFactory } from "../Input/Input";
import withOutsideClickHandler from "../common/components/withOutsideClickHandler";
export default inputFactory(withOutsideClickHandler(Select, false));
