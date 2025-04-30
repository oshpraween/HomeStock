import styled from 'styled-components';

export const DashboardContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
`;

export const Button = styled.button`
  background: ${(props) => (props.primary ? '#3498db' : '#ccc')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? '#2980b9' : '#aaa')};
  }
`;
