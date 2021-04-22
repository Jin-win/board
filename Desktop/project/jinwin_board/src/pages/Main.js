import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";
import Text from "../elements/Text";

const Main = () => {
  let history = useHistory();

  return (
    <Container>
      <MainView>
        <Text bold size="20px">
          게시글 작성
        </Text>
        <Button
          width="10%"
          _onClick={() => {
            history.push("/write");
          }}
        >
          글쓰기{" "}
        </Button>
      </MainView>
      <PostList />
    </Container>
  );
};

// const PostList = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 600px;
//   height: 200px;
//   border: 1px solid rgba(29, 161, 242, 1);
//   justify-content: center;
//   margin: auto;
//   margin-top: 30px;
// `;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainView = styled.div`
  display: flex;
  //수직관계에서는 align-items, 수평 justify-content
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 200px;
  border: 2px solid rgba(29, 161, 242, 1);
  justify-content: center;
  margin: auto;
  margin-top: 30px;
`;

export default Main;
