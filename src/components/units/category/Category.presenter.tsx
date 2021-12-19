import {
  Wrapper,
  ContentsWrapper,
  Products,
  ProductItem,
  ProductImg,
  ProductImgWrapper,
  ProductPrice,
  SelectWrapper,
  CateSelect,
} from "./Category.styles";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function CategoryUI(props: any) {
  const router = useRouter();
  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.value}`);
  }
  return (
    <Wrapper>
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
              {props.data?.fetchUseditems
                .filter((el: any) => el.tags[1] === props.router.query.category)
                .map((el: any, index: any) => (
                  <ProductItem
                    key={uuidv4()}
                    id={el._id}
                    onClick={props.onClickDetail}
                  >
                    <ProductImgWrapper>
                      <ProductImg
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
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
    </Wrapper>
  );
}
