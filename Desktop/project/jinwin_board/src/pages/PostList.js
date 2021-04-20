import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";

const PostList = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  // console.log(post_list[0]._id);

  React.useEffect(() => {
    dispatch(postActions.getPost());
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>글쓴이</th>
          </tr>
        </thead>
        <tbody>
          {post_list.map((p, i) => {
            return (
              <>
                <Post
                  key={i}
                  {...p}
                  // onClick={() => {
                  //   history.push("/view/" + post_list._id);
                  // }}
                />
              </>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

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

export default PostList;
