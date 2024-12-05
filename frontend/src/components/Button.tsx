import { ButtonProps, Button as MUIButton } from "@mui/material";

/**
 * Buttonラッパーコンポーネント
 */
export const Button = (props: ButtonProps) => {
    return <MUIButton {...props} />;
};
