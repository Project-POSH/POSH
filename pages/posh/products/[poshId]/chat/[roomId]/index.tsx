import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { getFirebaseConfig } from "../../../../../_app";
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
import { FETCH_USEDITEM } from "../../../../../../src/components/units/products/detail/ProductDetail.queries";

const FETCHUSERLOGGEDIN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      picture
      name
    }
  }
`;
const ChatInputWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
`;
const CommentsInputWrite = styled.input`
  width: 311px;
  height: 42px;
  background-color: #f3f3f3;
  border: none;
  padding-left: 12px;
  outline: none;
`;
const CommentsBnt = styled.div`
  width: 79px;
  height: 42px;
  background-color: #8915a6;
  font-family: "NotoSansKRregular";
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
`;
const GetMessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 358px;
  margin-bottom: 10px;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gray;
  object-fit: cover;
`;
const GetMessageBox = styled.div`
  width: 296px;
  border-radius: 10px;
  background-color: lightgray;
  padding: 10px 10px;
  margin-bottom: 7px;
`;
const MessageDate = styled.div`
  font-size: 12px;
  padding-left: 3px;
`;
const Name = styled.div`
  font-weight: 500;
`;
const ChatWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  overflow: auto;
  height: 730px;
`;

const firebaseAppConfig = getFirebaseConfig();
// TODO 0: Initialize Firebase
initializeApp(firebaseAppConfig);

// ///여기부터@!@@@@@@@
export default function Chat() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { data }: any = useQuery(FETCHUSERLOGGEDIN);
  const { data: item }: any = useQuery(FETCH_USEDITEM, {
    variables: { useditemId: router.query.poshId },
  });
  const onChagemessage = (e: any) => {
    setMessage(e.target.value);
  };

  const name = data?.fetchUserLoggedIn.name;
  const picture = data?.fetchUserLoggedIn.picture;
  const seller = item?.fetchUseditem.seller.name;

  async function saveMessage() {
    try {
      await addDoc(collection(getFirestore(), `chatDB`), {
        roomId: `${router.query.poshId}${router.query.roomId}`,
        productId: `${router.query.poshId}`,
        writer: name,
        seller: seller,
        text: message,
        profilePicUrl: picture,
        timestamp: serverTimestamp(),
        id: new Date().toString().slice(0, 25),
      });
      await setDoc(
        doc(
          collection(getFirestore(), `chatRoomDB`),
          `${router.query.poshId}${seller}${router.query.roomId}`
        ),
        {
          roomId: `${router.query.poshId}${router.query.roomId}`,
          productId: `${router.query.poshId}`,
          writer: name,
          seller: seller,
          text: message,
          profilePicUrl: picture,
          timestamp: serverTimestamp(),
          id: new Date().toString().slice(0, 25),
          participants: [`${seller}`, `${router.query.roomId}`],
        }
      );
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  function loadMessages() {
    const recentMessagesQuery = query(
      collection(getFirestore(), `chatDB`),
      where("roomId", "==", `${router.query.poshId}${router.query.roomId}`),
      orderBy("timestamp", "asc"),
      limit(100)
    );
    // Start listening to the query.
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

  useEffect(() => {
    loadMessages();
  }, []);
  console.log("렌더", messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ChatWrapper ref={msgRef}>
        {messages.map((el) => (
          <GetMessageWrapper key={el.timestamp}>
            <ProfileImg src={el.profilePicUrl} />
            <div>
              <Name>{el.writer}</Name>
              <GetMessageBox>{el.text}</GetMessageBox>
              <MessageDate>{el.id}</MessageDate>
            </div>
          </GetMessageWrapper>
        ))}
      </ChatWrapper>
      <ChatInputWrapper>
        <CommentsInputWrite
          placeholder="메세지를 입력하세요"
          onChange={onChagemessage}
        />
        <CommentsBnt onClick={saveMessage}>보내기</CommentsBnt>
      </ChatInputWrapper>
    </>
  );
}
