import {
  MessageWrapper,
  ProfileImg,
  Contents,
  LastTime,
  Name,
  ChatWrapper,
  NameAndTime,
} from "./Chat.styles";

export default function ChatUI(props: any) {
  return (
    <>
      <ChatWrapper ref={props.msgRef}>
        {props.messages.map((el: any) => (
          <MessageWrapper
            key={el.id}
            onClick={props.onClickToChatRoom}
            id={`${el.productId}/chat/${el.participants[1]}`}
          >
            <ProfileImg src={el.profilePicUrl} />
            <div>
              <NameAndTime>
                <Name>{el.writer[0]}</Name>
                <LastTime>{el.id.slice(4, 15)}</LastTime>
              </NameAndTime>
              <Contents>{el.text.slice(0, 42)}</Contents>
            </div>
          </MessageWrapper>
        ))}
      </ChatWrapper>
    </>
  );
}
