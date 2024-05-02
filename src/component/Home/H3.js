import styled from "styled-components";

export const H3 = styled.h3`
  border: 2px solid tomato;
  text-align: center;
  width: fit-content;
  margin: 30px auto;
  border-bottom: 3px solid ${({ theme }) => theme.colors.secondary};

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: 25px 0;
    margin-bottom: 0;
    font-size: 16px;
  }
`;
