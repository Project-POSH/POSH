import {
  CommentsBox,
  CommentsProfile,
  CommnetsNiname,
  CommentsProfileBox,
  Comments,
  Wrapper,
  CommentsDate,
  CommnetsEdit,
  CommentsEditWrapper,
  CommnetsWriteInput,
  CommnetsInput,
  CommentsBnt,
} from "./CommentsList.styles";
import {
  DELETE_USEDITEM_QUESTION,
  FETCH_USEDITEM_QUESTIONS,
  UPDATE_USEDITEM_QUESTION,
} from "./CommentsList.queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";


export default function CommentsListUIItems(props) {
  const router = useRouter()
  const [deleteUseditemQuestion] = useMutation(DELETE_USEDITEM_QUESTION);
  const [updateUseditemQuestion] = useMutation(UPDATE_USEDITEM_QUESTION);

  const [IsEdit, setIsEdit] = useState(false)
  const [contents,setContents] = useState("")
  // 댓글 삭제 함수
  const onClickCommentsDelete = async() => { 
    try { 
      await deleteUseditemQuestion({
        variables: { useditemQuestionId: props.el?._id },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: { useditemId: String(router.query.poshId) },
          },
        ],
      });
      alert("댓글이 삭제되었습니다!")
    } catch (error) {console.log(error.message) }
  }
  const onChangeCommentsEdit = (e) => {
    setContents(e.target.value)
  }

  // 댓글 수정 함수
  const onClickCommentsEdit = async() => {
    setIsEdit(true)
    try { 
      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: { contents },
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: { useditemId: String(router.query.poshId) },
          },
        ],
      });
    } catch (error) {console.log(error.message) }
  }
  return (
    <Wrapper>
      {!IsEdit && (
        <CommentsBox>
          <CommentsProfile src={props.el?.user.picture} />
          <CommentsProfileBox>
            <CommnetsNiname>{props.el?.user.name}</CommnetsNiname>
            <Comments>{props.el?.contents}</Comments>
            <CommentsDate>{props.el?.createdAt.slice(0, 10)}</CommentsDate>
            {props.userInfo?.fetchUserLoggedIn._id === props.el?.user._id ? (
              <CommentsEditWrapper>
                <CommnetsEdit onClick={onClickCommentsEdit}>수정</CommnetsEdit>
                <CommnetsEdit onClick={onClickCommentsDelete}>
                  삭제
                </CommnetsEdit>
              </CommentsEditWrapper>
            ) : (
              <CommentsEditWrapper>
                <CommnetsEdit>답글</CommnetsEdit>
              </CommentsEditWrapper>
            )}
          </CommentsProfileBox>
        </CommentsBox>
      )}
      {IsEdit && (
        <>
          <CommnetsWriteInput
            defaultValue={props.el?.contents}
            onChange={onChangeCommentsEdit}
          />
          <div style={{ display: "flex" }}>
            <CommnetsInput readOnly placeholder={contents.length + "/100"} />
            <CommentsBnt>취소</CommentsBnt>
            <CommentsBnt onClick={onClickCommentsEdit}>등록</CommentsBnt>
          </div>
        </>
      )}
    </Wrapper>
  );
}