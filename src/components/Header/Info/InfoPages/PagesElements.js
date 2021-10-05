import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const H3 = styled.h3`
  font-size: 33px;
  line-height: 1.8;
  color: #1c464e;
`;

export const H6 = styled.h6`
  font-size: 24px;
  text-align: center;
  color: #11373e;
  font-weight: 500;
`;

export const Content = styled.div`
  font-size: 20px;
  line-height: 1.5;
  margin: 5px 0 15px;
  text-align: center;
  color: rgb(4 37 47);
`;

export const PageNumber = styled.div`
  position: absolute;
  right: 1%;
  top: 1%;
  font-size: 20px;
  color: #1d1d1d;
`;

export const Heading = styled.h3`
  font-size: ${({ sz }) => sz};
  line-height: 1.8;
  color: #1c464e;
`;

export const Description = styled.div`
  font-size: 22px;
  line-height: 1.5;
  margin: 5px 0 15px;
  text-align: center;
  color: #11373e;
`;

export const ControlBar = styled.h3`
  font-size: 38px;
  line-height: 1.8;
  color: #1c464e;
  position: absolute;
  top: 0;
  right: 35%;
`;

export const Def = styled.div`
  font-size: 20px;
  line-height: 1.3;
  margin: 5px 0 15px;
  text-align: center;
  color: ${({ col }) => col};
`;

export const PageLink = styled.a`
  text-decoration: none;
  position: relative;
  color: #11373e;
  font-weight: 600;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #11373e;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }
  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

export const InfoContent = styled.div`
  font-size: 22px;
  line-height: 1.2;
  margin: 0 0 10px;
  text-align: center;
  color: #11373e;
`;

export const FunctionList = styled.li`
  list-style: disc;
  font-size: 18.5px;
  color: #11373e;
  padding: 0 2px;
`;
