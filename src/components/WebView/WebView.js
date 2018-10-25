import React from "react";
import config from "client_config";
import styled from "styled-components";

const Iframe = styled.iframe`
  height: 100vh;
  border: none;
  width: 100%;
`;
const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;
export default ({ url }) => {
  let _url = url && decodeURIComponent(url);
  if (url && /(^\.+|^\/)/.test(_url)) url = `${config.baseUrl}${_url}`;
  return (
    <Wrapper>
      <Iframe src={url} />
    </Wrapper>
  );
};
