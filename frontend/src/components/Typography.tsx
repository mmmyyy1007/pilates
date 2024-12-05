import { Typography as MUITypography, TypographyProps } from "@mui/material";

/**
 * Typographyラッパーコンポーネント
 */
export const Typography = (props: TypographyProps) => {
    return <MUITypography {...props} />;
};
