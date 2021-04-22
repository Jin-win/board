import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import { useDispatch, useSelector } from "react-redux";

const PostDetail = (props) => {
  console.log(props);
  console.log(props._id);

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  let [like, setLike] = React.useState(0);

  return (
    <Container>
      <Title>
        <Text bold size="16px">
          제목:
        </Text>
        &nbsp;
        <Text size="16px">{props.title}</Text>
      </Title>
      <Title>
        <Text bold size="16px">
          글쓴이:
        </Text>
        &nbsp;
        <Text size="16px">{props.author}</Text>
      </Title>

      <MyComment size="16px">{props.comment}</MyComment>
      <span
        onClick={() => {
          setLike(like + 1);
        }}
      >
        👍
        {like}
      </span>
    </Container>
  );
};

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MyComment = styled.div`
  padding: 10px;
  width: 400px;
  height: 100%;
  text-align: center;
  margin: auto;
  border: 1px solid rgba(29, 161, 242, 1);
`;
export default PostDetail;
