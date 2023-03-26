import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import validateCNPJ from "../utils/cnpjValidation";

const useStyles = makeStyles((theme) => ({
  addCompanyButton: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "20px",
    color: "#FFFFFF",
    backgroundColor: "#0385FD",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  modalHeader: {
    backgroundColor: "#0385FD",
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
}));

const CreateCompanyModal = ({ open, onClose, onSubmit, editingCompany }) => {
  CreateCompanyModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editingCompany: PropTypes.object,
  };
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    nome: "",
    website: "",
    cnpj: "",
  });
  const [validation, setValidation] = useState({
    nome: "",
    website: "",
    cnpj: "",
  });

  useEffect(() => {
    if (editingCompany) {
      setFormValues({
        nome: editingCompany.nome,
        website: editingCompany.website,
        cnpj: editingCompany.cnpj,
      });
    } else {
      setFormValues({
        nome: "",
        website: "",
        cnpj: "",
      });
    }
  }, [editingCompany]);

  const validateForm = useCallback(() => {
    let hasErrors = false;
    const newValidation = {
      nome: "",
      website: "",
      cnpj: "",
    };

    if (!formValues.nome) {
      hasErrors = true;
      newValidation.nome = "Nome é obrigatório";
    }

    if (!formValues.website) {
      hasErrors = true;
      newValidation.website = "Website é obrigatório";
    }

    if (!formValues.cnpj || !validateCNPJ(formValues.cnpj)) {
      hasErrors = true;
      newValidation.cnpj = "CNPJ inválido";
    }

    setValidation(newValidation);

    return !hasErrors;
  }, [formValues]);

  const onCloseModal = useCallback(() => {
    setFormValues({
      nome: "",
      website: "",
      cnpj: "",
    });
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (validateForm()) {
        onSubmit(formValues, onCloseModal);
      }
    },
    [validateForm, onSubmit, formValues, onCloseModal]
  );

  return (
    <Modal open={open} onClose={onCloseModal}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          bgcolor="white"
          borderRadius={5}
          maxWidth={800}
          maxHeight={600}
          width="100%"
        >
          <Box className={classes.modalHeader}>
            <Typography variant="h4">
              {editingCompany
                ? `Editar:${formValues.nome}`
                : "Adicionar Empresa"}
            </Typography>
            <IconButton className={classes.closeButton} onClick={onCloseModal}>
              &times;
            </IconButton>
          </Box>
          <Box p={2} display="flex" flexDirection="column">
            <form onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!validation.nome}
              >
                <InputLabel htmlFor="companyName">Nome</InputLabel>
                <OutlinedInput
                  id="companyName"
                  value={formValues.nome}
                  onChange={(e) =>
                    setFormValues({ ...formValues, nome: e.target.value })
                  }
                  required
                  label="Nome"
                />
                <FormHelperText>{validation.nome}</FormHelperText>
              </FormControl>
              <Box display="flex" justifyContent="space-between">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!validation.website}
                  width="48%"
                >
                  <InputLabel htmlFor="companyWebsite">Website</InputLabel>
                  <OutlinedInput
                    id="companyWebsite"
                    value={formValues.website}
                    onChange={(e) =>
                      setFormValues({ ...formValues, website: e.target.value })
                    }
                    required
                    label="Website"
                  />
                  <FormHelperText>{validation.website}</FormHelperText>
                </FormControl>

                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!validation.cnpj}
                  width="48%"
                >
                  <InputLabel htmlFor="companyCNPJ">CNPJ</InputLabel>
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={formValues.cnpj}
                    onChange={(e) =>
                      setFormValues({ ...formValues, cnpj: e.target.value })
                    }
                  >
                    {() => (
                      <OutlinedInput id="companyCNPJ" required label="CNPJ" />
                    )}
                  </InputMask>
                  <FormHelperText>{validation.cnpj}</FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="flex-end" marginTop="1em">
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.addCompanyButton}
                >
                  {editingCompany ? "Salvar" : "Adicionar"}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCompanyModal;
