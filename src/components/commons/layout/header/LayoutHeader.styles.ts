import styled from "@emotion/styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";

export const Wrapper = styled.div`
  background-color: #fff;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 100px;
  @media screen and (max-width: 600px) {
    height: 100px;
    background-color: #8915a6;
  }
`;
export const HeaderWrpper = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const HeaderLogo = styled.div`
  text-align: center;
  font-family: "NotoSansitalic";
  font-size: 35px;
  font-weight: 500;
  color: #8915a6;
  cursor: pointer;
`;
export const HeaderLogo2 = styled.div`
  padding: 44px 0px 11px 0px;
  text-align: center;
  font-family: "NotoSansitalic";
  font-size: 30px;
  font-weight: 500;
  color: #fff;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 75px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const SearchBar = styled.div`
  border: 1px solid #8915a6;
  border-radius: 30px;
  padding: 0 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Search = styled.input`
  width: 200px;
  height: 30px;
  background-color: #fff;
  border-radius: 4px 0px 0px 4px;
  border: none;
  font-family: "NotoSansKRregular";
  font-size: 14px;
  background-position: 320px;
  padding-left: 10px;
  margin-left: 5px;
  ::placeholder {
    color: #8915a6;
    opacity: 30%;
    font-size: 14px;
  }
  :focus {
    outline: none;
  }
`;
export const SearchBtn = styled(SearchOutlinedIcon)`
  font-size: 23px;
  border-radius: 0px 4px 4px 0px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: 20px;
  cursor: pointer;
  color: #555;
`;

export const HomeBtn = styled(HomeOutlinedIcon)`
  font-size: 23px;
  color: #555;
  :hover {
    color: #8915a6;
  }
`;
export const WriteBtn = styled(CheckroomOutlinedIcon)`
  font-size: 23px;
  color: #555;
  :hover {
    color: #8915a6;
  }
`;
export const ChatBtn = styled(ForumOutlinedIcon)`
  font-size: 23px;
  color: #555;
  padding-top: 2px;
  :hover {
    color: #8915a6;
  }
`;
export const MyPageBtn = styled(PersonOutlineOutlinedIcon)`
  font-size: 25px;
  color: #555;
  :hover {
    color: #8915a6;
  }
`;
export const IconBox = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const Profile = styled.img`
  object-fit: cover;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
// 카테고리 토글버튼 /////////////////////////////////////////////
export const CategoryBtn = styled(MenuIcon) <{ isOpen: boolean }>`
  font-size: 35px;
  color: ${(props) => (props.isOpen ? "#8915a6" : "#fff")};
  position: absolute;
  top: 49px;
  left: 10px;
  z-index: 1;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
export const Category = styled.div<{ isOpen: boolean }>`
  width: 300px;
  height: 100vh;
  background-color: #eee;
  z-index: 1;
  transition: all 0.35s;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? 0 : "-300px")};
  opacity: 95%;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
export const CategoryList = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 100px;
  left: ${(props) => (props.isOpen ? "100px" : "-300px")};
  transition: all 0.35s;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: hotpink; */
`;
export const CategoryName = styled.div`
  font-size: 35px;
  font-style: italic;
  color: #8915a6;
  font-weight: 500;
`;

export const MenuWrapper = styled.div`
  width: 600px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px){
    display: none;
  }
`
export const Menu = styled.span`
  display: block;
  position: relative;
  font-family: "NotoSansitalic";
  font-size: 13px;
  color: #525252;
  padding: 0px 0px;
  :hover {
    color: #8915a6;
    cursor: pointer;
    :after {
      width: 100%;
      left: 0;
      transition: width .5s ease, background-color .5s ease;
    }
  }
  :after {
    content: "";
    display: block;
    position: absolute;
    bottom: 5;
    z-index: 1;
    width: 0;
    height: 1px;
    background: #8915a6;
    left: 50%;
  }
`;