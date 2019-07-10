import Select from "./select";
import { inputFactory } from "../input/input";
import withOutsideClickHandler from "../common/components/withOutsideClickHandler";
export default inputFactory(withOutsideClickHandler(Select, false));
