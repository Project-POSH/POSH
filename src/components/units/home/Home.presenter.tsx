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
  CateSelect,
  SortSelect,
} from "./Home.styles";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";
import { sortBy } from "lodash";

export default function HomeUI(props: any) {
  const router = useRouter();

  const onClickDetail = (e: any) => {
    router.push(`/posh/products/${e.currentTarget.id}`);
  };

  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.value}`);
    console.log(event.target.value);
  }

  //sort 정렬
  // const items = props.data?.fetchUseditems.map(
  //   (el: any) => el.price
  // );
  // if (Array.isArray(props.data?.fetchUseditems)) {
  //   const tempOption = props.data?.fetchUseditems.map((item, index) => {
  //     if (index !== 1) {
  //       return item;
  //     }
  //   });
  //   const b = tempOption.sort((a, b) => b.price - a.price);
  //   console.log(b);
  // }
  // console.log(typeof props.data?.fetchUseditems[0]);

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
        <CateSelect onChange={onClickCategory}>
          <option value="home">All ITMES</option>
          <option value="top">TOP</option>
          <option value="bottom">BOTTOM</option>
          <option value="shoes">SHOES</option>
          <option value="bag">BAG</option>
          <option value="acc">ACC</option>
        </CateSelect>
        {/* <SortSelect>
          <option>최신순</option>
          <option>낮은가격</option>
          <option>높은가격</option>
        </SortSelect> */}
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
