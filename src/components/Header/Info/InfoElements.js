import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Container = styled.div`
  width: 780px;
  height: 70%;
  border: 1px solid #0369a5;
  padding: 16px 32px 24px;
  position: absolute;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  background-color: #d6dede;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SkipBtn = styled(Button)`
  color: #ffffff !important;
  background-color: #066886 !important;
  position: absolute !important;
  left: 3% !important;
  bottom: 3% !important;
  .MuiButton-startIcon {
    margin-right: 2px !important;
  }
`;

export const PreviousBtn = styled(Button)`
  color: #ffffff !important;
  background-color: #066886 !important;
  position: absolute !important;
  right: 18% !important;
  bottom: 3% !important;
  .MuiButton-startIcon {
    margin-right: 2px !important;
  }
`;

export const NextBtn = styled(Button)`
  color: #ffffff !important;
  background-color: #066886 !important;
  position: absolute !important;
  right: 3% !important;
  bottom: 3% !important;
  .MuiButton-startIcon {
    margin-right: ${({ flag }) => (flag ? "5px !important" : "2px !important")};
  }
`;

export const BtnTitle = styled.span`
  font-family: "Baloo Chettan 2", cursive;
  font-size: 16px;
  text-transform: none !important;
`;
