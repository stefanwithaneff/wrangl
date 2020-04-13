import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { useAppContext } from "../../utils/app-context";

type CreateAppDialogProps = {
  open: boolean;
  closeDialog: () => void;
};

const useTextFieldStyles = makeStyles((theme) => ({
  root: {
    width: `calc(50% - ${theme.spacing(1)}px)`,
  },
}));

function useFormInputState(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    (event) => {
      const eventValue = event.target.value;
      setValue(() => eventValue);
    },
    [setValue]
  );

  return { value, onChange };
}

function useAppDialogFields() {
  return {
    title: useFormInputState(),
    company: useFormInputState(),
    location: useFormInputState(),
    url: useFormInputState(),
    description: useFormInputState(),
  };
}

export function CreateAppDialog({ open, closeDialog }: CreateAppDialogProps) {
  const { create } = useAppContext();
  const textFieldClasses = useTextFieldStyles();
  const appDialogFields = useAppDialogFields();

  const { title, company, location, url, description } = appDialogFields;

  const createApplication = useCallback(() => {
    create({
      title: title.value,
      company: company.value,
      location: location.value,
      url: url.value,
      description: description.value,
    });
    closeDialog();
  }, [
    create,
    closeDialog,
    title.value,
    company.value,
    location.value,
    url.value,
    description.value,
  ]);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="create-app-form-title"
      aria-describedby="create-app-form-desc"
    >
      <DialogTitle id="create-app-form-title">Add new application</DialogTitle>
      <DialogContent>
        <DialogContentText id="create-app-form-desc">
          Add the details of your job application to start tracking it in the
          app
        </DialogContentText>
        <TextField
          label="Job Title"
          variant="outlined"
          autoFocus
          fullWidth
          margin="dense"
          {...title}
        ></TextField>
        <Box display="flex" justifyContent="space-between">
          <TextField
            classes={textFieldClasses}
            label="Company"
            variant="outlined"
            margin="dense"
            {...company}
          ></TextField>
          <TextField
            classes={textFieldClasses}
            label="Location"
            variant="outlined"
            margin="dense"
            {...location}
          ></TextField>
        </Box>
        <TextField
          label="URL"
          variant="outlined"
          margin="dense"
          fullWidth
          {...url}
        ></TextField>
        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          rows={4}
          multiline
          fullWidth
          {...description}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={createApplication}>
          Track
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function useDialogControls() {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => setOpen(true), [setOpen]);
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);

  return { open, openDialog, closeDialog };
}
