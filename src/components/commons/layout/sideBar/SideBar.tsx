import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../../../pages/_app";

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
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default function SideBar() {
  const router = useRouter();
  const { setSearch }: any = useContext(GlobalContext);
  const onClickMoveHome = () => {
    router.push("/posh/home");
    setSearch("")
  };

  return <Side onClick={onClickMoveHome}>POSH</Side>;
}
