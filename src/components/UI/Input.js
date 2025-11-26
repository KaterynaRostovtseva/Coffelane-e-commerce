import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";


export const StyledTextField = styled(TextField)`
    width: 100%;
    font-size: 16px;
    
    .MuiOutlinedInput-root {
        border-radius: 8px;

        fieldset {
            border-color: #000;
        }

        &:hover fieldset {
            border-color: #000;
            color: green;
        }

        &.Mui-focused fieldset {
            border-color: #A4795B;
        }

        &.Mui-error input {
            border-color: #FF2F2F;
            color: #FF2F2F;
        }

        &.Mui-error label {
            color: #FF2F2F;
        }

        &.Mui-error fieldset {
            color: #FF2F2F;
        }
    }

    .MuiInputBase-adornedStart {
        padding: 0;
    }

    .MuiInputBase-multiline.MuiAutocomplete-inputRoot {
        height: 100%;
        padding: 0;
    }

    //Eye icon color
    .MuiInputAdornment-root {
        svg {
            path {
                fill: #666;
            }
        }
    }

    .MuiFormHelperText-root {
        margin: 3px 0 0;

        &.Mui-error {
            color: #FF2F2F;
        }
    }


    input {
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        padding: 0 8px;
        -webkit-appearance: none;

        &::placeholder {
            color: #999;
            opacity: 1;
        }
    }

    .MuiInputBase-root.Mui-disabled {
        .MuiAutocomplete-endAdornment {
            opacity: 0.6;
        }
    }

    .MuiInputLabel-root {
        color: #000;
    }

    .MuiInputLabel-root.Mui-error {
        color: #FF2F2F;
    }

    //Input label position

    label {
        top: -5px;
        font-size: 16px;
        color: #999;

        &[data-shrink='true'] {
            top: 1px;
        }
    }

    label.Mui-focused {
        color: #000;
    }

    //label white background

    .MuiOutlinedInput-notchedOutline {
        legend {
            font-size: 0.75em;
        }
    }

    .MuiAutocomplete-endAdornment {
        display: flex;
        top: 0;
        height: 100%;
        align-items: center;
        transform: none;

        .MuiButtonBase-root {
            padding: 2px;

            svg {
                height: 18px;
                width: 18px;
            }
        }
    }

`
