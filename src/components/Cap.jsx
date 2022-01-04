import React from "react";
import styled from "styled-components";
import ImageCap from "../images/cap.png";

const StyledCap = styled.div`
  background: url(${ImageCap}) no-repeat center center;
  width: 64px;
  height: 64px;
  position: absolute;
  margin-left: -27px;
  margin-top: -10px;
  z-index: 9999;
`;

export default function Cap(props) {
  return <StyledCap>{props.children}</StyledCap>;
}
