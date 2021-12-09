import {
  ContentsWrapper,
  Products,
  ProductItem,
  ProductImgWrapper,
  CateWrapper,
  Category,
  CateDiv,
  ProductPrice,
  ProductImg,
  SelectWrapper,
} from "./Home.styles";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomeUI(props: any) {
  const router = useRouter();

  const onClickDetail = (e: any) => {
    router.push(`/posh/products/${e.currentTarget.id}`);
  };

  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.value}`);
    console.log(event.target.value);
  }

  return (
    <>
      {/* <CateWrapper>
        <CateDiv>
          <Category onClick={onClickCategory} id="top">
            Top
          </Category>

          <Category onClick={onClickCategory} id="bottom">
            Bottom
          </Category>

          <Category onClick={onClickCategory} id="shoes">
            Shoes
          </Category>

          <Category onClick={onClickCategory} id="bag">
            Bag
          </Category>

          <Category onClick={onClickCategory} id="acc">
            Acc
          </Category>
        </CateDiv> */}
      {/* </CateWrapper> */}
      <SelectWrapper>
        <select
          style={{
            width: "100px",
            fontSize: "13px",
            outline: "none",
            color: "#444",
            border: "none",
          }}
          onChange={onClickCategory}
        >
          <option>All ITMES</option>
          <option>top</option>
          <option>bottom</option>
          <option>shoes</option>
          <option>bag</option>
          <option>acc</option>
        </select>
        <select
          style={{
            width: "100px",
            fontSize: "13px",
            outline: "none",
            color: "#444",
            border: "1px solid #ccc",
          }}
        >
          <option>최신순</option>
          <option>낮은가격</option>
          <option>높은가격</option>
        </select>
      </SelectWrapper>
      <ContentsWrapper>
        {props.data && (
          <InfiniteScroll
            pageStart={0}
            loadMore={props.lodeMore}
            hasMore={true}
            useWindow={true}
          >
            <Products>
              {props.data?.fetchUseditems.map((el: any, index: any) => (
                <ProductItem key={index} id={el._id} onClick={onClickDetail}>
                  <ProductImgWrapper>
                    <ProductImg
                      src={
                        el.images.filter((el: any) => el)[0]
                          ? `https://storage.googleapis.com/${
                              el.images.filter((el: any) => el)[0]
                            }`
                          : "/images/noImage.png"
                      }
                    />
                  </ProductImgWrapper>
                  <ProductPrice>
                    {el.name}
                    <br />
                    {el.price.toLocaleString()}원
                  </ProductPrice>
                </ProductItem>
              ))}
            </Products>
          </InfiniteScroll>
        )}
        {/* <a href="#" style={{ width: "500px", backgroundColor: "blue" }}>
          위로가기
        </a> */}
      </ContentsWrapper>
    </>
  );
}
