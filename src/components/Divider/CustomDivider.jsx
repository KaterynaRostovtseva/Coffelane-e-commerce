import {Typography} from "@mui/material";
import {StyledCustomDivider} from "./styles.js";

export const CustomDivider = ({
    label }) => (
    <StyledCustomDivider>
        <Typography variant="body2">{label}</Typography>
    </StyledCustomDivider>
)