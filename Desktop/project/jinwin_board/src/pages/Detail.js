import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import Button from "../elements/Button";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as postActions } from "../redux/modules/post";

import PostDetail from "../components/PostDetail";

const Detail = (props) => {
  const { history } = props;
  // console.log(props);
  const dispatch = useDispatch();

  let url = document.location.href.split("/");
  let post_id = url[url.length - 1];
  console.log(post_id);
  // let post_id = url[-1];
  // console.log(post_id);

  let postId = props.match.params.postId;
  console.log(postId);

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    console.log(props.match);
    //param을 사용해서 조건을 줌
    dispatch(postActions.getPost());
  }, []);

  const deletePost = () => {
    dispatch(postActions.deletePostSV(post_id, history));
  };

  return (
    <React.Fragment>
      <Container>
        {post_list.map((v, idx) => {
          if (post_list[idx]._id == postId) {
            return <PostDetail key={idx} {...v} />;
          }
        })}
        <ButtonContainer>
          <Button
            width="10%"
            _onClick={() => {
              history.push("/");
            }}
          >
            돌아가기
          </Button>
          <Button
            width="10%"
            margin="0px 0px 0px 5px"
            _onClick={() => {
              history.push(`/write/${postId}`);
            }}
          >
            수정하기
          </Button>
          <Button width="10%" margin="0px 0px 0px 5px" _onClick={deletePost}>
            삭제하기
          </Button>
        </ButtonContainer>
      </Container>
    </React.Fragment>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px 30px 20px;
`;
// const MyComment = styled.div`
//   width: 400px;
//   text-align: center;
//   margin: auto;
//   border: 1px solid rgba(29, 161, 242, 1);
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  border: 1px solid rgba(29, 161, 242, 1);
  justify-content: center;
  text-align: center;
  margin: auto;
  margin-top: 30px;
`;

export default Detail;
