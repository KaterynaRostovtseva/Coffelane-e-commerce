import {styled} from "@mui/material/styles";
import {Tab} from "@mui/material";
import {typography} from "../../theme/typography.js";

export const StyledTab = styled(Tab)`
    text-transform: none;
    font-weight: ${typography.h3.fontWeight};
    font-size: ${typography.h3.fontSize};
    line-height: ${typography.h3.lineHeight};
    min-width: auto;
    padding: 0;
    flex-grow: 1;

    &.Mui-selected {
        color: #3E3027;
    }
    
    &:not(.Mui-selected) {
        color: #999;
    }
`;

