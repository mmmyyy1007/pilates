import { Typography } from "@/components/Typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";

export const PilatesQuotes = () => {
    return (
        <Box
            style={{
                padding: "1rem",
                background: "linear-gradient(135deg, #ffffff, #f1f4f9)",
                borderRadius: "2px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                textAlign: "center",
                maxWidth: "700px",
                margin: "auto",
            }}
        >
            <Paper
                elevation={3}
                style={{
                    padding: "1rem",
                    borderRadius: "2px",
                    position: "relative",
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                        color: "#2c3e50",
                        lineHeight: "1.6",
                        fontSize: "1.2rem",
                    }}
                >
                    &quot;In 10 sessions you&apos;ll feel the difference, in 20 you&apos;ll see the difference, and in
                    30 you&apos;ll have a whole new body.&quot;
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "0.9rem",
                        color: "#7f8c8d",
                        lineHeight: "1.8",
                    }}
                >
                    10回で違いを感じ、20回で見た目に変化が現れ、30回で全く新しい身体を手に入れる。
                </Typography>
                <Typography
                    variant="subtitle2"
                    align="right"
                    style={{
                        fontFamily: "Georgia, serif",
                        fontWeight: "bold",
                        color: "#34495e",
                    }}
                >
                    — Joseph Pilates
                </Typography>
            </Paper>
        </Box>
    );
};
