import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Post = (props) => {
  const { history } = props;
  console.log(props._id);

  return (
    <React.Fragment>
      <Tr
        onClick={() => {
          history.push(`/view/${props._id}`);
        }}
      >
        <Td>{props.no}</Td>
        <Td>{props.title}</Td>
        <Td>{props.author}</Td>
        <Td>👍</Td>
      </Tr>
    </React.Fragment>
  );
};

const Td = styled.td`
  border-bottom: 1px solid rgba(29, 161, 242, 1);
  padding: 10px;
`;

const Tr = styled.tr`
  &:hover {
    background-color: rgba(29, 161, 242, 1);
    color: white;
  }
`;

export default withRouter(Post);
