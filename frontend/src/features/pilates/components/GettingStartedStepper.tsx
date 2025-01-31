import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, MobileStepper, Paper, useTheme } from "@mui/material";
import { useState } from "react";

const steps = [
    {
        label: "店舗一覧",
        description: `レッスン場所を登録する。`,
    },
    {
        label: "レッスン一覧",
        description: "レッスン日時を登録する。",
    },
    {
        label: "30回",
        description: `ピラティスを30回行う。`,
    },
];

export const GettingStartedStepper = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: "background.default",
                }}
            >
                <Typography>{steps[activeStep].label}</Typography>
            </Paper>
            <Box sx={{ height: 50, maxWidth: 400, width: "100%", p: 2 }}>{steps[activeStep].description}</Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};
