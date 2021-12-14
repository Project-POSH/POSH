import {
  TitleWrapper,
  Wrapper,
  ContentsWrapper,
  Title,
  AccountWrapper,
  Account,
  AccountInfo,
  Error,
  ButtonWrapper,
  Login,
  Signup,
} from "./Login.styles";

export default function LoginUI(props: any) {
  return (
    <Wrapper>
      <ContentsWrapper>
        <TitleWrapper>
          <Title>POSH</Title>
        </TitleWrapper>
        <AccountWrapper>
          <Account>
            <AccountInfo
              placeholder="email ID : posh@gmail.com"
              type="text"
              onChange={props.onChangeEmail}
            />
            <Error>{props.emailError}</Error>
          </Account>
          <Account>
            <AccountInfo
              placeholder="Password : 1111"
              type="password"
              onChange={props.onChangePassword}
            />
            <Error>{props.passwordError}</Error>
          </Account>
          <ButtonWrapper>
            <Login onClick={props.onClickLogin}>로그인</Login>
            <Signup onClick={props.onClickMoveSignup}>회원가입</Signup>
          </ButtonWrapper>
        </AccountWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
}
