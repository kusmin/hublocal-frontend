import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
  },
  modalHeader: {
    backgroundColor: theme.palette.error.main,
    color: "#FFFFFF",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.dark,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: "#FFFFFF",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  locationName: {
    fontWeight: 700,
  },
}));

const DeleteLocalModal = ({
  open,
  onClose,
  onDelete,
  locationName,
  locationId,
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Box bgcolor="white" borderRadius={5} maxWidth={800} maxHeight={400} width="100%">
          <Box className={classes.modalHeader}>
            <Typography variant="h4">Confirmação de exclusão</Typography>
            <IconButton
              className={classes.closeButton}
              onClick={onClose}
              aria-label="Fechar"
            >
              &times;
            </IconButton>
          </Box>
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            minHeight={200}
            justifyContent="space-between"
          >
            <Typography variant="h5" p={3}>
              O local{" "}
              <span className={classes.locationName}>{locationName}</span> será
              excluído. Tem certeza dessa ação?
            </Typography>
            <Box display="flex" justifyContent="flex-end" marginTop="1em">
              <Button
                variant="contained"
                className={classes.deleteButton}
                onClick={() => onDelete(locationId, onClose)}
              >
                Excluir
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteLocalModal;