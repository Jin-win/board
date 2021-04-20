import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { history } from "../redux/configureStore";
import post, { actionsCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "react-redux";

const Write = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  // console.log(post_list);

  // const [author, setAuthor] = React.useState("");
  // const [title, setTitle] = React.useState("");
  // const [comment, setComment] = React.useState("");

  const changeAuthor = (e) => {
    setAuthor(e.target.value);
    console.log(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const changeComment = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const uploadPost = () => {
    dispatch(postActions.addPostSV(author, title, comment, history));
  };

  const editPost = () => {
    // dispatch(postActions.editPostSV(post_id, author, title, comment));
    dispatch(postActions.editPostSV(post_id, title, comment, history));
  };

  // 수정페이지
  // console.log(props.match.params.id);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  console.log(post_id);
  console.log(is_edit);

  const _post = is_edit ? post_list.find((p) => p._id === post_id) : null;
  console.log(_post);

  //수정페이지에서 이미 써놓은 글 데이터 가지고 있게하기
  //위에 setState 괄호 안에 (_post? _post.value들: "")
  const [author, setAuthor] = React.useState(_post ? _post.author : "");
  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [comment, setComment] = React.useState(_post ? _post.comment : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      window.alert("포스트 정보가 없어요!");
      history.goBack();
      return;
    }
  }, []);

  return (
    <Container>
      <InputArea>
        <Input
          value={title}
          type="text"
          placeholder="제목을 입력하세요"
          _onChange={changeTitle}
        ></Input>
        &nbsp;
        <Input
          value={author}
          type="text"
          placeholder="글쓴이를 입력하세요"
          _onChange={changeAuthor}
        ></Input>
        &nbsp;
        <Input
          value={comment}
          type="text"
          multiLine
          placeholder="내용을 입력하세요"
          _onChange={changeComment}
        ></Input>
        &nbsp;
        {is_edit ? (
          <Button width="10%" margin="0px 0px 0px 5px" _onClick={editPost}>
            수정하기
          </Button>
        ) : (
          <Button width="10%" _onClick={uploadPost} margin="0px 0px 0px 5px">
            저장하기
          </Button>
        )}
        &nbsp; &nbsp;
        <Button
          width="10%"
          margin="0px 0px 0px 5px"
          _onClick={() => {
            history.push("/");
          }}
        >
          돌아가기{" "}
        </Button>
      </InputArea>
    </Container>
  );
};

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Write;
