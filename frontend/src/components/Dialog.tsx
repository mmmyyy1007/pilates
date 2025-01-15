import { Button } from "@/components/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Dialog as MUIDialog,
} from "@mui/material";

/**
 * ダイアログの型
 */
interface DialogProps {
    open: boolean;
    title: string;
    content: string;
    cancel: string;
    confirm: React.ReactNode;
    onClose: () => void;
    onConfirm: (e: React.FormEvent) => Promise<void>;
}

/**
 * ダイアログコンポーネント
 */
export const Dialog = ({ open, title, content, cancel, confirm, onClose, onConfirm }: DialogProps) => {
    return (
        <MUIDialog open={open} onClose={onClose}>
            <DialogTitle>
                {title}
                <IconButton aria-label="close" onClick={onClose} style={{ position: "absolute", right: 4, top: 4 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    {cancel}
                </Button>
                <Button variant="outlined" color="error" autoFocus onClick={onConfirm}>
                    {confirm}
                </Button>
            </DialogActions>
        </MUIDialog>
    );
};
