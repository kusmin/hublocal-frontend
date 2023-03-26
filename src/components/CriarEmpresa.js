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
  const classes = useStyles();
  const [cnpj, setCnpj] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    website: "",
    cnpj: "",
  });

  useEffect(() => {
    if (editingCompany) {
      setName(editingCompany.nome);
      setCnpj(editingCompany.cnpj);
      setWebsite(editingCompany.website);
    } else {
      setName("");
      setCnpj("");
      setWebsite("");
    }
  }, [editingCompany]);

  const validateFields = useCallback(() => {
    let hasErrors = false;
    const newErrors = {
      name: "",
      website: "",
      cnpj: "",
    };

    if (!name) {
      hasErrors = true;
      newErrors.name = "Nome é obrigatório";
    }

    if (!website) {
      hasErrors = true;
      newErrors.website = "Website é obrigatório";
    }

    if (!cnpj || !validateCNPJ(cnpj)) {
      hasErrors = true;
      newErrors.cnpj = "CNPJ inválido";
    }

    setErrors(newErrors);

    return !hasErrors;
  }, [name, website, cnpj]);

  const onCloseModal = useCallback(() => {
    setCnpj("");
    setWebsite("");
    setName("");
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (validateFields()) {
        onSubmit({ nome: name, website, cnpj }, onCloseModal);
      }
    },
    [validateFields, onSubmit, name, website, cnpj, onCloseModal]
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
              {editingCompany ? `Editar:${name}` : "Adicionar Empresa"}
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
                error={!!errors.name}
              >
                <InputLabel htmlFor="companyName">Nome</InputLabel>
                <OutlinedInput
                  id="companyName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  label="Nome"
                />
                <FormHelperText>{errors.name}</FormHelperText>
              </FormControl>
              <Box display="flex" justifyContent="space-between">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.website}
                  width="48%"
                >
                  <InputLabel htmlFor="companyWebsite">Website</InputLabel>
                  <OutlinedInput
                    id="companyWebsite"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                    label="Website"
                  />
                  <FormHelperText>{errors.website}</FormHelperText>
                </FormControl>

                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.cnpj}
                  width="48%"
                >
                  <InputLabel htmlFor="companyCNPJ">CNPJ</InputLabel>
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  >
                    {() => (
                      <OutlinedInput id="companyCNPJ" required label="CNPJ" />
                    )}
                  </InputMask>
                  <FormHelperText>{errors.cnpj}</FormHelperText>
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
