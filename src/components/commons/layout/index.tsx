import LayoutFooterM from "./footer_mobile/LayoutFooterMobile";
import LayoutHeader from "./header/LayoutHeader";
import LayoutFooterPC from "./footer_pc/LayoutFooterPC";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Body = styled.div<{ pathname: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 400px) {
    min-height: ${(props: any) =>
      props.pathname !== "/" &&
      props.pathname !== "/posh/accounts/login" &&
      props.pathname !== "/posh/accounts/signup"
        ? "1200px"
        : ""};
    padding-top: ${(props: any) =>
      props.pathname !== "/" &&
      props.pathname !== "/posh/accounts/login" &&
      props.pathname !== "/posh/accounts/signup"
        ? "30px"
        : ""};
  }
`;
const Side = styled.div`
  position: fixed;
  font-size: 40px;
  font-family: "NotoSansitalic";
  width: 200px;
  left: 0;
  top: 40vh;
  transform: rotate(270deg);
  cursor: pointer;
  :hover {
    color: #8915a6;
  }
  @media screen and (max-width:600px){
    display: none;
  }
`;

const HiddenHeader = ["/posh/accounts/login", "/posh/accounts/signup", "/"];
const HiddenFooter = [
  "/posh/accounts/login",
  "/posh/accounts/signup",
  "/posh/products/[poshId]/comment",
  "/",
  "/posh/products/[poshId]/chat/[roomId]",
];
const HiddeonFooterPC = [
  "/posh/user/chat",
  "/posh/accounts/login",
  "/posh/accounts/signup",
  "/",
  "/posh/products/[poshId]/chat/[roomId]",
];

export default function Layout(props: any) {
  const router = useRouter();
  const isHiddenHeader = HiddenHeader.includes(router.pathname);
  const isHiddenFooter = HiddenFooter.includes(router.pathname);
  const isHiddenFooterPC = HiddeonFooterPC.includes(router.pathname);
  const onClickMoveHome = () => {
    router.push("/posh/home");
  };
  return (
    <Wrapper>
      {!isHiddenHeader && <LayoutHeader />}
      <Side onClick={onClickMoveHome}>POSH</Side>
      <Body pathname={router.pathname}>{props.children}</Body>
      {!isHiddenFooter && <LayoutFooterM />}
      {!isHiddenFooterPC && <LayoutFooterPC />}
    </Wrapper>
  );
}
