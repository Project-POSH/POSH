import {
  CommentsBox,
  CommentsProfile,
  CommnetsNiname,
  CommentsProfileBox,
  Comments,
  CommentsDate,
  CommnetsEdit,
  CommentsEditWrapper,
  CommentsAnswerIcon,
} from "./CommentsAnswerList.styles";
import {
  DELET_USEDITEM_QUESTION_ANSWER,
  FETCH_USEDITEM_QUESTION_ANSWERS,
} from "./CommentsAnswerList.queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import CommentsAnswer from '../write/CommentsAnswer'

export default function CommentsAnswerListUIItem(props) {
  const [deleteUseditemQuestionAnswer] = useMutation(
    DELET_USEDITEM_QUESTION_ANSWER
  );
  const [isEdit, setIsEdit] = useState(false);
  
  const onClickIsEdit = () => setIsEdit(true)
  
  const onClickDeleteCommnetsAnsewer = async () => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: { useditemQuestionAnswerId: String(props.el._id) },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(props.id) },
          },
        ],
      }); alert("삭제 완료")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!isEdit && (
        <CommentsBox>
          <CommentsAnswerIcon />
          <CommentsProfile src={props.el?.user.picture} />
          <CommentsProfileBox>
            <CommnetsNiname>{props.el?.user.name}</CommnetsNiname>
            <Comments>{props.el?.contents}</Comments>
            <CommentsDate>{props.el?.createdAt.slice(0, 10)}</CommentsDate>
            {props.userInfo?.fetchUserLoggedIn._id === props.el?.user._id ? (
              <CommentsEditWrapper>
                <CommnetsEdit onClick={onClickIsEdit}>수정</CommnetsEdit>
                <CommnetsEdit onClick={onClickDeleteCommnetsAnsewer}>
                  삭제
                </CommnetsEdit>
              </CommentsEditWrapper>
            ) : (
              <CommentsEditWrapper>
                {/* <CommnetsEdit>답글</CommnetsEdit> */}
              </CommentsEditWrapper>
            )}
          </CommentsProfileBox>
        </CommentsBox>
      )}
      {isEdit && (
        <CommentsAnswer isEdit={isEdit} setIsEdit={setIsEdit} el={props.el} />
      )}
    </>
  );
}