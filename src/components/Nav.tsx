import React from "react";
import { AppBar, Typography, makeStyles } from "@material-ui/core";

const useAppBarStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

export function Nav() {
  const appBarClasses = useAppBarStyles();
  return (
    <AppBar
      classes={appBarClasses}
      color="transparent"
      elevation={0}
      position="sticky"
    >
      <Typography variant="h5">wrangl</Typography>
    </AppBar>
  );
}
