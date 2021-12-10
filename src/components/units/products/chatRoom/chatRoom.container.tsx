import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { getFirebaseConfig } from "../../../../../pages/_app";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  FETCH_USEDITEM,
  FETCH_USER_LOGGED_IN,
} from "../detail/ProductDetail.queries";
import ChatRoomUI from "./chatRoom.presenter";

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default function ChatRoom() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { data }: any = useQuery(FETCH_USER_LOGGED_IN);
  const { data: item }: any = useQuery(FETCH_USEDITEM, {
    variables: { useditemId: router.query.poshId },
  });

  const onChangemessage = (e: any) => {
    setMessage(e.target.value);
  };

  const name = data?.fetchUserLoggedIn.name;
  const myId = data?.fetchUserLoggedIn._id;
  const picture = data?.fetchUserLoggedIn.picture;
  const seller = item?.fetchUseditem.seller._id;
  const productImg = item?.fetchUseditem.images?.[0];
  const productName = item?.fetchUseditem.name;
  const productPrice = item?.fetchUseditem.price;
  const roomId = `${router.query.poshId}${router.query.roomId}`;
  const inputRef = useRef<HTMLInputElement | any>(null);

  async function saveMessage() {
    try {
      await addDoc(collection(getFirestore(), `chatDB`), {
        roomId: roomId,
        productId: router.query.poshId,
        writer: [name, myId],
        seller: seller,
        text: message,
        profilePicUrl: picture,
        timestamp: serverTimestamp(),
        id: new Date().toString().slice(0, 21),
      });
      await setDoc(doc(collection(getFirestore(), `chatRoomDB`), roomId), {
        roomId: roomId,
        productId: router.query.poshId,
        writer: [name, myId],
        seller: seller,
        text: message,
        profilePicUrl: picture,
        timestamp: serverTimestamp(),
        id: new Date().toString().slice(0, 25),
        participants: [seller, router.query.roomId],
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
    inputRef.current.value = "";
  }

  function loadMessages() {
    const recentMessagesQuery = query(
      collection(getFirestore(), `chatDB`),
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc"),
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

  function onClickToProduct() {
    router.push(`/posh/products/${router.query.poshId}`);
  }

  function onClickToProfile() {
    router.push(`/posh/products/${router.query.poshId}/seller`);
  }

  function enterKey() {
    if (window.event.keyCode == 13) {
      saveMessage();
    }
  }

  useEffect(() => {
    loadMessages();
  }, [roomId, name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("렌더", messages);
  return (
    <ChatRoomUI
      onChangemessage={onChangemessage}
      productImg={productImg}
      productName={productName}
      productPrice={productPrice}
      saveMessage={saveMessage}
      onClickToProduct={onClickToProduct}
      msgRef={msgRef}
      messages={messages}
      inputRef={inputRef}
      myId={myId}
      onClickToProfile={onClickToProfile}
      enterKey={enterKey}
    />
  );
}
