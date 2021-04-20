import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import { useDispatch, useSelector } from "react-redux";

const PostDetail = (props) => {
  console.log(props);
  console.log(props._id);

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  return (
    <>
      <Text>{props.title}</Text>
      <Text>{props.author}</Text>
      <MyComment>{props.comment}</MyComment>
    </>
  );
};

const MyComment = styled.div`
  width: 400px;
  text-align: center;
  margin: auto;
  border: 1px solid rgba(29, 161, 242, 1);
`;
export default PostDetail;
