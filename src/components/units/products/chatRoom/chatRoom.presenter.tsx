import {
  Box,
  ChatInputWrapper,
  CommentsInputWrite,
  CommentsBnt,
  GetMessageWrapper,
  ProfileImg,
  GetMessageBox,
  MessageDate,
  Name,
  ChatWrapper,
  ProductWrapper,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductPrice,
  MessageInfo,
  MyMessageWrapper,
} from "./chatRoom.styles";

export default function ChatRoomUI(props: any) {
  return (
    <Box>
      <ProductWrapper onClick={props.onClickToProduct}>
        <ProductImg
          src={`https://storage.googleapis.com/${props.productImg}`}
        />
        <ProductInfo>
          <ProductName>{props.productName}</ProductName>
          <ProductPrice>₩{props.productPrice}</ProductPrice>
        </ProductInfo>
      </ProductWrapper>
      <ChatWrapper ref={props.msgRef}>
        {props.messages.map((el: any) => (
          <>
            {props.myId !== el.writer[1] ? (
              <GetMessageWrapper key={el.timestamp}>
                <ProfileImg
                  src={el.profilePicUrl}
                  onClick={props.onClickToProfile}
                />
                <MessageInfo>
                  <Name>{el.writer[0]}</Name>
                  <GetMessageBox>{el.text}</GetMessageBox>
                  <MessageDate>{el.id}</MessageDate>
                </MessageInfo>
              </GetMessageWrapper>
            ) : (
              <MyMessageWrapper key={el.timestamp}>
                <GetMessageBox>{el.text}</GetMessageBox>
                <MessageDate>{el.id}</MessageDate>
              </MyMessageWrapper>
            )}
          </>
        ))}
      </ChatWrapper>
      <ChatInputWrapper>
        <CommentsInputWrite
          placeholder="메세지를 입력하세요"
          onChange={props.onChangemessage}
          ref={props.inputRef}
        />
        <CommentsBnt onClick={props.saveMessage}>보내기</CommentsBnt>
      </ChatInputWrapper>
    </Box>
  );
}
