import styled from "@emotion/styled";

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.div`
  color: #8915a6;
`;
const ZipcodeWrapper = styled.div`
  width: 358px;
  display: flex;
  align-items: center;
  padding-top: 3px;
`;
const Zipcode = styled.input`
  border: 1px solid #b69acb;
  border-radius: 4px;
  height: 52px;
  padding-left: 17px;
`;
const ZipcodeBtn = styled.button`
  background-color: #8915a6;
  border-style: none;
  border-radius: 4px;
  color: #fff;
  width: 120px;
  height: 52px;
  margin-left: 6px;
`;
const InputBox = styled.input`
  border: 1px solid #b69acb;
  border-radius: 4px;
  width: 358px;
  height: 52px;
  margin-top: 8px;
  padding-left: 17px;
`;

export default function Address01(props: any) {
  return (
    <Wrapper>
      <Label>거래장소*</Label>
      <ZipcodeWrapper>
        <Zipcode type="text" value="02810" readOnly />
        <ZipcodeBtn type="button" onClick={props.onClickZipcodeBtn}>
          우편번호검색
        </ZipcodeBtn>
      </ZipcodeWrapper>
      <InputBox type="text" />
      <InputBox type="text" {...props.register} />
    </Wrapper>
  );
}
