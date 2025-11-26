import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  border-radius: 20px;
  max-width: 131px;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 24px;
  background-color: #a4795b;

  &:hover {
    background-color: #b88a6e;
  }
`;
