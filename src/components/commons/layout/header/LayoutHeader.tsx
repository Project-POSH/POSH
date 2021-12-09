import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_USER_LOGGED_IN } from "../../../units/products/detail/ProductDetail.queries";
import {
  Wrapper,
  HeaderWrpper,
  HeaderLogo,
  HeaderLogo2,
  SearchWrapper,
  Search,
  SearchBtn,
  HomeBtn,
  WriteBtn,
  ChatBtn,
  MyPageBtn,
  IconBox,
  IconWrapper,
  Profile,
  CategoryBtn,
  Category,
  CategoryList,
  CategoryName,
  SearchBar,
  MenuWrapper,
  Menu,
} from "./LayoutHeader.styles";
import { GlobalContext } from "../../../../../pages/_app";
import { useContext, useState } from "react";
// import SearchBar01 from "../../searchBars/searchBar01";

export default function LayoutHeader() {
  const { setSearch }: any = useContext(GlobalContext);
  const [mySearch, setMySearch] = useState("");

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onChangeSearch = (e: any) => {
    setMySearch(e.target.value);
  };
  const onClickSearch = () => {
    setSearch(mySearch);
  };

  function onClickMove(event: any) {
    router.push(event.currentTarget.id);
  }

  function onClickOpen() {
    setIsOpen((prev) => !prev);
  }

  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.id}`);
    setIsOpen(false);
  }

  const { data } = useQuery(FETCH_USER_LOGGED_IN);



  return (
    <Wrapper>
      <Category isOpen={isOpen}>
        <CategoryList isOpen={isOpen}>
          <CategoryName onClick={onClickCategory} id="top">
            Top
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="bottom">
            Bottom
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="shoes">
            Shoes
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="bag">
            Bag
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="acc">
            Acc
          </CategoryName>
        </CategoryList>
      </Category>
      <CategoryBtn onClick={onClickOpen} isOpen={isOpen}></CategoryBtn>
      <HeaderLogo2 onClick={onClickMove} id="/posh/home">
        POSH
      </HeaderLogo2>
      {/* <HeaderWrpper>
        <HeaderLogo onClick={onClickMove} id="/posh/home">
          POSH
        </HeaderLogo>
        <SearchWrapper></SearchWrapper>
        <IconWrapper>
          <SearchBar>
            <Search onChange={onChangeSearch} />
            <SearchBtn onClick={onClickSearch}></SearchBtn>
          </SearchBar>
          <IconBox onClick={onClickMove} id="/posh/home">
            <HomeBtn />
          </IconBox>
          <IconBox onClick={onClickMove} id="/posh/products/write">
            <WriteBtn />
          </IconBox>
          <IconBox onClick={onClickMove} id="/posh/user/chatList">
            <ChatBtn />
          </IconBox>
          {data?.fetchUserLoggedIn.picture ? (
            <IconBox style={{ marginLeft: "10px" }}>
              <Profile
                src={data?.fetchUserLoggedIn.picture}
                onClick={onClickMove}
                id="/posh/user/mypage"
              />
            </IconBox>
          ) : (
            <IconBox onClick={onClickMove} id="/posh/user/mypage">
              <MyPageBtn />
            </IconBox>
          )}
        </IconWrapper> */}
      {/* </HeaderWrpper> */}
      <MenuWrapper>
        <Menu>ABOUT</Menu>
        <Menu>BOARD</Menu>
        <Menu>SEARCH</Menu>
        <Menu onClick={onClickMove} id="/posh/products/write">
          SUBMIT
        </Menu>
        <Menu onClick={onClickMove} id="/posh/user/chatList">
          CHAT
        </Menu>
        <Menu onClick={onClickMove} id="/posh/user/mypage">MY PAGE</Menu>
        <Menu onClick={onClickMove} id="/posh/accounts/login">LOGIN</Menu>
        <Menu onClick={onClickMove} id="/posh/accounts/signup">JOIN US</Menu>
      </MenuWrapper>
    </Wrapper>
  );
}
