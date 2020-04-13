import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import {
  CreateAppDialog,
  useDialogControls,
} from "../CreateApp/CreateAppDialog";

const useContainerStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(16),
  },
}));

export function HomePage() {
  const { open, openDialog, closeDialog } = useDialogControls();
  const containerClasses = useContainerStyles();
  return (
    <Container classes={containerClasses}>
      <Box mb={6}>
        <Box mb={1}>
          <Typography align="center" variant="h2">
            Organize your job search
          </Typography>
        </Box>
        <Typography align="center" variant="body1">
          Track your applications and receive reminders to follow up
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          disableElevation
          color="primary"
          variant="contained"
          size="large"
          onClick={openDialog}
        >
          Track your applications
        </Button>
      </Box>
      <CreateAppDialog open={open} closeDialog={closeDialog} />
    </Container>
  );
}
