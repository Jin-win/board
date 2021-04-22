import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { response } from "./mockup";
import { useHistory } from "react-router";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const ONE_POST = "ONE_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id, title, comment) => ({
  post_id,
  title,
  comment,
}));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

const initialState = {
  list: [],
  post: [],
};

// console.log(initialPost);

const getPost = () => {
  return function (dispatch) {
    // const res = response.articles;
    // let post_list = [];
    // for (let i = 0; i < res.length; i++) {
    //   post_list.push({
    //     _id: res[i]._id,
    //     author: res[i].author,
    //     comment: res[i].comment,
    //     no: res[i].no,
    //     title: res[i].title,
    //   });
    // }
    // dispatch(setPost(post_list));
    // console.log(post_list);

    const options = {
      url: "/hh99/board/list",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data.articles);
        const res = response.data.articles;
        let post_list = [];
        for (let i = 0; i < res.length; i++) {
          post_list.push({
            _id: res[i]._id,
            author: res[i].author,
            comment: res[i].comment,
            no: res[i].no,
            title: res[i].title,
          });
        }
        dispatch(setPost(post_list));
        console.log(post_list);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert(error.response.data.errorMessage);
        }
      });
  };
};

const getOnePost = (postId) => {
  // const queryId = props.location.search.split("=")[1];
  // console.log(queryId);

  return function (dispatch) {
    const res = response.view;
    console.log(res);
    let post_list = [];
    for (let i = 0; i < res.length; i++) {
      post_list.push({
        _id: res[i]._id,
        author: res[i].author,
        comment: res[i].comment,
        no: res[i].no,
        title: res[i].title,
      });
    }

    dispatch(onePost(post_list));
    console.log(post_list);

    // const objid = "objid=" + postId;
    // console.log(objid);

    // const options = {
    //   url: `http://spartacodingclub.shop/hh99/board/view/${postId}`,
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // };
    // axios(options)
    //   .then((response) => {
    //     console.log(response.data);
    //     const res = response.data;
    //     let post = [];
    //     for (let i = 0; i < res.length; i++) {
    //       post.push({
    //         author: res.author,
    //         comment: res.comment,
    //         title: res.title,
    //       });
    //     }
    //     dispatch(onePost(post));
    //     console.log(post);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response) {
    //       window.alert(error.response.data.errorMessage);
    //     }
    //   });
  };
};

const addPostSV = (author, title, comment, history) => {
  return function (dispatch) {
    let formData = new FormData();
    formData.append("author", author);
    formData.append("title", title);
    formData.append("comment", comment);
    //   author: author,
    //   title: title,
    //   comment: comment,
    // };
    // console.log(_post);

    const options = {
      url: "/hh99/board/post ",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: formData,
    };
    axios(options).then((response) => {
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "게시물 작성 완료!",
        showConfirmButton: false,
        timer: 1500,
      });

      history.push("/");
    });
  };
};

const editPostSV = (post_id, title, comment, history) => {
  return function (dispatch) {
    console.log(post_id, title, comment);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("comment", comment);
    formData.append("objid", post_id);

    const options = {
      url: "/hh99/board/update",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: formData,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        let _post = {
          post_id: post_id,
          title: title,
          comment: comment,
        };

        console.log(_post);
        dispatch(editPost(_post));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "게시물 수정 완료!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deletePostSV = (post_id, history) => {
  return function (dispatch) {
    console.log(post_id);
    let formData = new FormData();
    formData.append("objid", post_id);

    const options = {
      url: "/hh99/board/delete",
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: formData,
    };
    axios(options);
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 삭제할게요",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post_id));
        Swal.fire("삭제되었습니다!");
        history.push("/");
      }
    });
    // .then((response) => {
    //   console.log(response);
    //   dispatch(deletePost(post_id));
    //   window.alert("게시물 삭제가 완료되었습니다.");
    //   history.push("/");
    // })
    // .catch((error) => {
    //   console.log(error);
    //   if (error.response) {
    //     window.alert(error.response.data.errorMessage);
    //   }
    // });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        console.log(action.payload);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id.post_id
        );
        draft.list[idx] = action.payload.post_list;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let new_post_list = draft.list.filter((v) => {
          if (v.post_id !== action.payload.post) {
            return v;
          }
        });

        draft.list = new_post_list;
      }),
  },
  initialState
);

//action creator export
const actionsCreators = {
  setPost,
  addPost,
  getPost,
  editPost,
  editPostSV,
  onePost,
  addPostSV,
  getOnePost,
  deletePost,
  deletePostSV,
};

export { actionsCreators };
