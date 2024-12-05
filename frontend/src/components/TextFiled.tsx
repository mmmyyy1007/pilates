import { TextField as MUITextField, TextFieldProps } from "@mui/material";

/**
 * TextFieldラッパーコンポーネント
 */
export const TextField = (props: TextFieldProps) => {
    return <MUITextField {...props} />;
};
