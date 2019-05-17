import styled from 'styled-components'
import theme from "./theme";

const Button = styled.button`
    transition: all .3s ease;
    background: ${props => theme.colors[Object.keys(props).find(p => theme.colors[p])] || theme.colors.primary};
    text-transform: ${props => props.upper ? 'uppercase' : 'none'};
    font-weight: 300;
    color: ${theme.colors.default};
    padding: 9px 13px;
    margin: 1px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    width: ${props => props.large ? '100%' : 'auto'};
    &:hover {
        opacity: .7;
    }
`;

export default Button