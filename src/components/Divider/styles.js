import {styled} from "@mui/material/styles";
import {Divider} from "@mui/material";
import {typography} from "../../theme/typography.js";

export const StyledCustomDivider = styled(Divider)`
    margin: 16px 0;
    width: 100%;
    align-self: stretch;
    color: #000;
    &::after, ::before {
        border-top: 2px solid #3E3027;
    }
    .MuiTypography-root {
        color: #3E3027;
        padding: 0 16px;
        font-size: ${typography.h6.fontSize};
        font-weight: ${typography.h6.fontWeight};
    }
`
