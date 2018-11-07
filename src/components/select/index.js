import Select from "./select";
import { inputFactory } from "../Input/input";
import withOutsideClickHandler from "../common/components/withOutsideClickHandler";
export default inputFactory(withOutsideClickHandler(Select, false));
