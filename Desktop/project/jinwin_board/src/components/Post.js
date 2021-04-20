import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Post = (props) => {
  const { history } = props;
  console.log(props._id);

  return (
    <React.Fragment>
      <tr
        onClick={() => {
          history.push(`/view/${props._id}`);
        }}
      >
        <td>{props.no}</td>
        <td>{props.title}</td>
        <td>{props.author}</td>
      </tr>
    </React.Fragment>
  );
};

export default withRouter(Post);
