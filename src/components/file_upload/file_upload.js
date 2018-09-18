import React, { Component } from "react";
import styled from "styled-components";
import { getPager } from "../common/components/Pager/Pager";
import { getSlice, convertToString } from "../common/utils";
import {
  labelBackgroundColor,
  minimumInputHeight,
  inputPadding
} from "../common/variables";
import PropTypes from "prop-types";
import { IconButton } from "../common/components/Button/Button";
import {
  Table,
  TableCell,
  TableHead,
  TableRow
} from "../common/components/Table";
import { inputFactory } from "../input/input";
// More info on all the options is below in the README...just some common use cases shown here
const convertToBrowserFilter = function(filter) {
  if (filter)
    return filter
      .split("|")
      .map(x => `.${x}`)
      .join(",");
  return filter;
};

const isAdvancedUpload = (function() {
  var div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window
  );
})();

const imageTypes = /(png|jpeg|jpg)/i,
  xlsxTypes = /xlsx|xlx/i;

const UploadContainer = styled.div`
  border: 1px dashed ${labelBackgroundColor};
  height: ${minimumInputHeight}px;
  position: relative;
  display: flex;
  align-items: center;
  padding: ${inputPadding};
`;
const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
`;
const UploadButton = styled(IconButton).attrs({
  icon: "file-upload"
})`
  align-self: flex-start;
  position: relative;
`;
const StyledImagePreview = styled.img``;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.dropped = this.dropped.bind(this);
    this.openFileSelector = this.openFileSelector.bind(this);
  }
  static supports(fileType) {
    return !!FileUpload.getPreview(fileType);
  }
  static getPreview(fileType) {
    for (var i = 0; i < Previews.length; i++) {
      if (Previews[i].id.test(fileType)) return Previews[i];
    }
  }
  static getPreviewQuery(fileType) {
    let preview = FileUpload.getPreview(fileType);
    return preview ? preview.query : "";
  }
  openFileSelector(e) {
    if (e && e.target && e.target.files && e.target.files.length) {
      this.props.upload(e.target.files[0]);
    }
  }
  dropped(e) {
    e.preventDefault();
    this.props.upload(e.dataTransfer.files[0]);
  }
  render() {
    let Preview = this.props.previewType,
      preview;
    if (this.props.preview) {
      preview = <Preview data={this.props.preview} />;
    }
    return (
      <UploadContainer onDrop={this.dropped}>
        <UploadButton disabled={!!this.props.disabled} icon="file-upload" />
        {preview}
        <b>{this.props.title}</b>
        {isAdvancedUpload && (
          <small>
            &nbsp;&nbsp;&nbsp;
            {"Drag and drop or select files"}
          </small>
        )}
        <Input
          onChange={this.openFileSelector}
          accept={convertToBrowserFilter(this.props.allowed)}
          type="file"
          id={this.props.component_uid}
          key={this.props.component_uid}
          disabled={!!this.props.disabled}
        />
      </UploadContainer>
    );
  }
}

FileUpload.propTypes = {
  component_uid: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  preview: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  allowed: PropTypes.string,
  previewType: PropTypes.any,
  upload: PropTypes.func.isRequired
};
export default inputFactory(FileUpload, true);

export const ImagePreview = props => (
  <StyledImagePreview src={props.data.uri} />
);
ImagePreview.propTypes = {
  data: PropTypes.object.isRequired
};
ImagePreview.id = imageTypes;
ImagePreview.query = "?format=base64";

const XlsxPager = getPager(); // generate pager with default components.
export class XlsxPreview extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 5, page: 1 };
    this.setCurrentItems = this.setCurrentItems.bind(this);
  }
  setCurrentItems(page) {
    this.setState({ page });
  }
  render() {
    const headers = this.props.data.length
      ? Object.keys(this.props.data[0]).map((x, index) => (
          <TableCell key={"_head" + index}>{x}</TableCell>
        ))
      : [];
    const { start, end } = getSlice(this.state.page, this.state.count);
    const items = (this.props.data && this.props.data.slice(start, end)) || [];
    return [
      <Table>
        <TableHead>{headers}</TableHead>
        {items.map((item, idx) => (
          <TableRow key={idx}>
            {Object.keys(item).map((x, ind) => (
              <TableCell key={x + ind}>{convertToString(item[x])}</TableCell>
            ))}
          </TableRow>
        ))}
      </Table>,
      <XlsxPager
        {...this.state}
        items={this.props.data}
        total={this.props.data.length}
        setCurrentItems={this.setCurrentItems}
      />
    ];
  }
}
XlsxPreview.id = xlsxTypes;
XlsxPreview.propTypes = {
  data: PropTypes.array
};

export const Previews = [ImagePreview, XlsxPreview];
export const UnsupportedText = props => {
  return <Text>{props.message}</Text>;
};
UnsupportedText.propTypes = {
  message: PropTypes.string.isRequired
};
