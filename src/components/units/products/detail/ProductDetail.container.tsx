import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// import { useState } from "react";
import ProductDetailUI from "./ProductDetail.presenter";
import {
  FETCH_USEDITEM,
  FETCH_USEDITEM_QEUSTIONS,
  FETCH_USER_LOGGED_IN,
  DELETE_USEDITEM,
  TOGGLE_USEDITEM_PICK,
  FETCH_USEDITEMS_I_PICKED,
} from "./ProductDetail.queries";
import { UPDATE_USEDITEM } from "../write/ProductWrite.queries";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const [picked, setPicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUseditem] = useMutation(DELETE_USEDITEM);
  const [toggleUseditemPick] = useMutation(TOGGLE_USEDITEM_PICK);
  const [updateUseditem] = useMutation(UPDATE_USEDITEM);
  const router = useRouter();
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.poshId,
    },
  });

  const { data: questions } = useQuery(FETCH_USEDITEM_QEUSTIONS, {
    variables: {
      useditemId: router.query.poshId,
    },
  });

  const { data: userInfo } = useQuery(FETCH_USER_LOGGED_IN);

  const { data: pickData } = useQuery(FETCH_USEDITEMS_I_PICKED, {
    variables: { search: "" },
  });

  useEffect(() => {
    if (pickData?.fetchUseditemsIPicked.filter((el: any) => el._id === router.query.poshId).length === 0){
      setPicked(false); // prettier-ignore
    } else if(pickData?.fetchUseditemsIPicked.filter((el: any) => el._id === router.query.poshId).length !== 0){
      setPicked(true)
    } // prettier-ignore
  }, [pickData, userInfo]);

  function onClickToCommentPage() {
    router.push(`/posh/products/${router.query.poshId}/comment`);
  }

  function onClickToEdit() {
    router.push(`/posh/products/${router.query.poshId}/edit`);
  }

  // 상품삭제 ///////////////////////////////////////////////////////////////////
  function onClickDelete() {
    deleteUseditem({ variables: { useditemId: router.query.poshId } });
    router.push(`/posh/home`);
  }

  function onClickClose() {
    setIsOpen(false);
  }

  function onClickToDelete() {
    setIsOpen(true);
  }

  function onClickPick() {
    setPicked((prev) => !prev);

    try {
      toggleUseditemPick({
        variables: { useditemId: router.query.poshId },
        refetchQueries: [
          {
            query: FETCH_USEDITEM,
            variables: {
              useditemId: router.query.poshId,
            },
          },
        ],
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function onChangeStatus(event: any) {
    try {
      updateUseditem({
        variables: {
          useditemId: router.query.poshId,
          updateUseditemInput: {
            tags: [event.target.value, data?.fetchUseditem.tags[1]],
          },
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function onClickProfile() {
    router.push(`/posh/products/${router.query.poshId}/seller`);
  }

  function onClickToChat() {
    router.push(
      `/posh/products/${router.query.poshId}/chat/${userInfo?.fetchUserLoggedIn._id}`
    );
  }

  return (
    <ProductDetailUI
      data={data}
      questions={questions}
      userInfo={userInfo}
      onClickToCommentPage={onClickToCommentPage}
      onClickToEdit={onClickToEdit}
      onClickDelete={onClickDelete}
      onClickPick={onClickPick}
      picked={picked}
      onChangeStatus={onChangeStatus}
      onClickProfile={onClickProfile}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClickClose={onClickClose}
      onClickToDelete={onClickToDelete}
      onClickToChat={onClickToChat}
    />
  );
}
