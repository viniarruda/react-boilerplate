import { createGlobalStyle  } from 'styled-components'
import reset from 'styled-reset'

const BaseStyles = createGlobalStyle`
    ${reset}
    body { 
        margin: 0
    };
`;

export default BaseStyles