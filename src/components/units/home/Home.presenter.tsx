import {
  ContentsWrapper,
  Products,
  ProductItem,
  ProductImgWrapper,
  ProductPrice,
  ProductImg,
  SelectWrapper,
  CateSelect,
} from "./Home.styles";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";

export default function HomeUI(props: any) {
  const router = useRouter();

  const onClickDetail = (e: any) => {
    router.push(`/posh/products/${e.currentTarget.id}`);
  };

  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.value}`);
  }

  return (
    <>
      <SelectWrapper>
        <CateSelect onChange={onClickCategory}>
          <option value="home">All ITMES</option>
          <option value="top">TOP</option>
          <option value="bottom">BOTTOM</option>
          <option value="shoes">SHOES</option>
          <option value="bag">BAG</option>
          <option value="acc">ACC</option>
        </CateSelect>
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
      </ContentsWrapper>
    </>
  );
}
