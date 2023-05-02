import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFire, faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
const Filter = () => {
    return (
        <Wrapper>
            <FilterWrapper>
                <InputWrapper>
                    <InputItem placeholder="Search" />
                    <InputIconWrapper>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputIconWrapper>
                </InputWrapper>
                <ItemWrapper>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faFire} />
                    </BtnIconWrapper>
                    <Item>
                        <H1>인기순</H1>
                    </Item>
                </ItemWrapper>
                <ItemWrapper>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faMusic} />
                    </BtnIconWrapper>
                    <Item>
                        <H1>최신순</H1>
                    </Item>
                </ItemWrapper>
                <ItemWrapper>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faHeart} />
                    </BtnIconWrapper>
                    <Item>
                        <H1>찜한 목록</H1>
                    </Item>
                </ItemWrapper>
            </FilterWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 8%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const FilterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
`;

const Item = styled.div`
    background: white;
    width: 138px;
    height: 56px;
    border-radius: 15px; // 원하는 크기로 조절
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    position: relative;
`;

const InputItem = styled.input`
    background: white;
    width: 200px;
    height: 40px;
    border-radius: 15px;
    padding: 0 40px 0 20px;
`;
const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 224px;
    height: 40px;
    margin-right: 20px;
`;

const InputIconWrapper = styled.div`
    position: absolute;
    right: 10px;
`;
const BtnIconWrapper = styled.div`
    position: absolute;
    top: 10px;
`;

const H1 = styled.h1`
    margin-bottom: 5px;
`;

export default Filter;
