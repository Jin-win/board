import React from "react";
import imgA from "../twitter_icon_130806.png";
import styled from "styled-components";
import Grid from "../elements/Grid";
import { history } from "../redux/configureStore";

const Header = (props) => {
  return (
    <Grid
      _onClick={() => {
        history.push("/");
      }}
    >
      <MyNav>
        <img src={imgA} width="30" heigth="30" alt="logo"></img>
        &nbsp;
        <div>짹짹쓰</div>
      </MyNav>
    </Grid>
  );
};

const MyNav = styled.div`
  background: rgba(29, 161, 242, 1);
  width: 100%;
  display: flex;
  color: white;
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  box-sizing: border-box;
`;

export default Header;
