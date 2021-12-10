import styled from "@emotion/styled";

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// map으로 불러오는 images css
export const Products = styled.div`
  width: 390px;
  overflow: auto;
  padding-top: 10px;
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
  @media screen and (min-width: 600px) {
    width: 1100px;
  }
`;
export const ProductItem = styled.div`
  width: 128px;
  height: 128px;
  background-color: #eee;
  border: none;
  margin: 1px 1px;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    width: 356px;
    height: 420px;
    margin: 5px 5px;
    position: relative;
    object-fit: cover;
    overflow: hidden;
  }
`;
export const ProductImgWrapper = styled.div`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 600px) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    /* -webkit-transform: all 0.2s ease;
    transition: all 0.2s ease; */
    overflow: hidden;
    bottom: 0px;
    :hover {
      /* bottom: 60px; */
      opacity: 50%;
    }
  }
`;
export const CateWrapper = styled.div`
  width: 900px;
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const Category = styled.a`
  display: block;
  padding: 10px 10px;
  position: relative;
  font-size: 15px;
  font-family: "NotoSansitalic";
  color: #555;
  :hover {
    color: #8915a6;
    :after {
      width: 100%;
      left: 0;
      transition: all 0.3s;
    }
  }
  :after {
    content: "";
    display: block;
    position: absolute;
    bottom: 5;
    z-index: -1;
    width: 0;
    height: 3px;
    background: #8915a6;
    left: 50%;
  }
`;
export const CateDiv = styled.div`
  list-style: none;
  width: 900px;
  display: flex;
  justify-content: space-between;
  padding: 0px 70px;
  /* border-bottom: 1px solid #b69acb; */
`;
export const ProductPrice = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (min-width: 600px) {
    width: 100%;
    height: 60px;
    padding: 7px 10px 10px 10px;
    color: #111;
    background-color: #eee;
    /* opacity: 100%; */
    position: absolute;
    bottom: 0px;
    font-weight: 500;
    border: solid 1px lightgray;
    border-top: none;
    font-style: italic;
    font-size: 15px;
  }
`;
export const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1090px;
  @media screen and (max-width:600px){
    display: none;
  }
`
export const CateSelect = styled.select`
  width: 100px;
  font-size: 13px;
  outline: none;
  color: #444;
  border: none;
`
export const SortSelect = styled.select`
  width: 100px;
  font-size: 13px;
  outline: none;
  color: #444;
  border: 1px solid #ccc;
`