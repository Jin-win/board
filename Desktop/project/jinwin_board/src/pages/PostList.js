import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";
import Input from "../elements/Input";

const PostList = (props) => {
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");

  const { history } = props;

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  // console.log(post_list[0]._id);

  React.useEffect(() => {
    dispatch(postActions.getPost());
  }, []);

  return (
    <Container>
      <Search>
        <Input
          value={search}
          placeholder="검색"
          _onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></Input>
      </Search>
      <Table>
        <thead>
          <tr>
            <Th>글번호</Th>
            <Th>제목</Th>
            <Th>글쓴이</Th>
            <Th>좋아요</Th>
          </tr>
        </thead>
        <thead>
          {post_list
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (val.title.includes(search)) {
                return val;
              } else if (val.author.includes(search)) {
                return val;
              }
            })
            .map((p, i) => {
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
        </thead>
      </Table>
    </Container>
  );
};
const Search = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid rgba(29, 161, 242, 1);
`;

const Table = styled.table`
  width: 100%;
  border-top: 2px solid rgba(29, 161, 242, 1);
  border-bottom: 2px solid rgba(29, 161, 242, 1);
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 2px solid rgba(29, 161, 242, 1);
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
  /* border: 1px solid rgba(29, 161, 242, 1); */
  justify-content: center;
  text-align: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default PostList;
