import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// map으로 불러오는 images css
export const BodyWrpper = styled.div`
  width: 390px;
  overflow: auto;
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
  @media screen and (min-width: 600px) {
    width: 900px;
  }
`;
export const BodyBox = styled.div`
  width: 128px;
  height: 128px;
  background-color: #eee;
  border: none;
  margin: 1px 1px;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    width: 221px;
    height: 221px;
    margin: 2px 2px;
    position: relative;
    object-fit: cover;
    overflow: hidden;
  }
`;
export const ProductImg = styled.div`
  object-fit: cover;
  width: 100%;
  height: 100%;
    @media screen and (min-width: 600px) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    -webkit-transform: all .2s ease;
    transition: all .2s ease;
    overflow: hidden;
    bottom: 0px;
      :hover{
        bottom: 60px;
      }
  }
`;

export const CateWrapper = styled.div`
  width: 900px;
  margin: 20px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    display: none;
  }
`
export const Category = styled.a`
  display: block;
  padding: 10px 10px;
  position: relative;
  font-size: 25px;
  font-family: "NotoSansitalic";
  color: #555;
  :hover{
    color: #555;
    :after {
    width: 100%;
    left: 0;
    transition: all .3s;
    }
  }
  :after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    z-index: -1;
    width: 0;
    height: 4px;
    background: #8915A6;
    left: 50%;
  }
`
export const CateDiv = styled.ul`
  list-style: none;
  width: 900px;
  display: flex;
  justify-content: space-between;
  padding: 0px 70px;
  /* border-bottom: 1px solid #b69acb; */
`
export const ProductPrice = styled.div`
  @media screen and (max-width: 600px) {
  display: none;
  }
  @media screen and (min-width: 600px) {
    width: 100%;
    height: 60px;
    padding: 7px 10px 10px 10px;
    color: #111;
    background-color: #FFF;
    position: absolute;
    bottom: 0px;
    font-weight: 500;
    border: solid 1px lightgray;
    border-top:none;
    font-style: italic;
    font-size: 15px;
    }
`