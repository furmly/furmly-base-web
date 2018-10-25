import PropTypes from "prop-types";
import styled from "styled-components";
import { media } from "../common/utils";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  flex-wrap: wrap;
  ${media.xSmall`
  flex-direction:column;
  
  `};
`;

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Container;

export const DynamicColumns = styled(Container)`
  & > * {
    width: ${props => 100 / props.columns}%;
  }
`;
export const TwoColumn = styled(Container)`
  & > * {
    width: 50%;
  }
`;

export const ThreeColumn = styled(Container)`
  & > * {
    width: 33.3%;
  }
`;

export const Dynamic = styled(Container)`
  & {
    .grid,
    .section,
    .actionview,
    .htmlview,
    .list,
    .selectset,
    .label,
    .webview,
    .input:only-child,
    .select:only-child,
    .download:only-child,
    .fileupload:only-child {
      width: 100%;
    }
    .input,
    .select,
    .download,
    .fileupload,
    .download {
      width: 50%;
    }

    // .select:nth-child(even) + .input,
    // .input:nth-child(even) + .select,
    // .select:nth-child(odd) + .input,
    // .input:nth-child(odd) + .select,
    // .label:first-child + .input:last-child,
    // .label:first-child + .select:last-child,
    // .label:first-child + .download:last-child,
    // .label:first-child + .fileupload:last-child {
    //   width: 100%;
    // }
  }
  ${media.xSmall`
  & {
    .input,
    .select,
    .download,
    .fileupload,
    .download {
      width: 100% !important;
    }
  }
  
  `};
`;
