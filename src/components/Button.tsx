import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 3px;
  width: 150px;
  padding: 12px 18px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  background-color: #474747;
  box-shadow: 0 0 4px #616161;
  outline: none;
  &:hover {
    background: #616161 radial-gradient(circle, transparent 1%, #616161 1%)
      center/15000%;
  }
`;

export default Button;
