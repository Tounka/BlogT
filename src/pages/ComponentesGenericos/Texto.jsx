import styled from "styled-components";
export const TextoGenerico = styled.p`
    font-size: ${props => props.size ? props.size : '14px'};
    font-weight: ${props => props.bold ? 'bold' : ''};
    color: ${props => props.color ? props.color : ''};
    color: ${props => props.aling ? props.aling : 'justify'};
   
    margin: 0;
`;