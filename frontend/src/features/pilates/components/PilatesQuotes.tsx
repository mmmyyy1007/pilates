import { Typography } from "@/components/Typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";

export const PilatesQuotes = () => {
    return (
        <Box>
            <Paper elevation={3}>
                <Typography>Joseph Pilates</Typography>
                <Typography>
                    &quot;In 10 sessions you&ldquo;ll feel the difference, in 20 you&ldquo;ll see the difference, and in
                    30 you&ldquo;ll have a whole new body.&quot;
                </Typography>
                <Typography>
                    10回で違いを感じ、 20回で見た目に変化が現れ、 30回で全く新しい身体を手に入れる。
                </Typography>
            </Paper>
        </Box>
    );
};
