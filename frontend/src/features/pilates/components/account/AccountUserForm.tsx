import { Typography } from "@/components/Typography";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import { MouseEvent } from "react";

interface AccountUserFormProps {
    value: string;
    label: string;
    dataKey: string;
    handleModalOpenUser: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const AccountUserForm = ({ value, label, dataKey, handleModalOpenUser }: AccountUserFormProps) => {
    return (
        <Typography>
            {value}
            <IconButton
                color="default"
                aria-label={label}
                data-key={dataKey}
                type="button"
                onClick={handleModalOpenUser}
            >
                <CreateIcon />
            </IconButton>
        </Typography>
    );
};
