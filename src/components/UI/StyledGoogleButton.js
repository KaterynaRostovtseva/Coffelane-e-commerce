import {styled} from "@mui/material/styles";

import Button from "@mui/material/Button";

export const GoogleButton = styled(Button)`
  border-radius: 20px;
  max-width: 230px;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #333;
  background-color: #fff;

  &:hover {
    background-color: #f5f5f5;
  }
`;