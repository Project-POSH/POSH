import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { getFirebaseConfig } from "../../../../../pages/_app";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import ChatUI from "./Chat.presenter";
import { FETCH_USER_LOGGED_IN } from "../../products/detail/ProductDetail.queries";

const firebaseAppConfig = getFirebaseConfig();

// initializeApp(firebaseAppConfig);
getApps().length === 0 ? initializeApp(firebaseAppConfig) : getApp();

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const { data }: any = useQuery(FETCH_USER_LOGGED_IN);
  const ID = data?.fetchUserLoggedIn._id;

  function loadMessages() {
    const recentMessagesQuery = query(
      collection(getFirestore(), `chatRoomDB`),
      where("participants", "array-contains", `${ID}`),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    onSnapshot(recentMessagesQuery, function (snapshot) {
      // @ts-ignore
      setMessages(snapshot.docs.map((el) => el.data()));
    });
  }

  const msgRef = useRef<HTMLDivElement>();

  function scrollToBottom() {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }

  function onClickToChatRoom(event: any) {
    router.push(`/posh/products/${event.currentTarget.id}`);
  }

  useEffect(() => {
    loadMessages();
  }, [ID]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatUI
      onClickToChatRoom={onClickToChatRoom}
      messages={messages}
      msgRef={msgRef}
    />
  );
}
