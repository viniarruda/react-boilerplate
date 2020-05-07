import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const BaseStyles = createGlobalStyle`
    ${reset}
    body { margin: 0 };
    html { font-family: 'Montserrat', sans-serif; }
    * { box-sizing: border-box; };
`;

export default BaseStyles;
