import {styled, css} from "@mui/material/styles";
import {Dialog} from "@mui/material";

export const StyledDialog = styled(Dialog, {shouldForwardProp: prop => prop !== 'modalIsOpen'})`
    .MuiDialog-paper {
        margin: 0;
        margin-left: auto;
        height: 100vh;
        max-height: 100vh;
        width: 500px;
        border-radius: 24px 0 0 0px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;

        &.MuiDialog-paperWidthSm {
            max-width: 400px;
        }

    }

    ${({modalIsOpen}) => modalIsOpen && css`
        .MuiDialog-paper {
            transform: translateX(0)
        }
    `}
`;