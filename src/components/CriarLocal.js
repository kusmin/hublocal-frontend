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
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { importCep } from "../utils/validateCep";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
  },
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

const CreateLocalModal = ({ open, onClose, onSubmit, editingLocal }) => {
  const classes = useStyles();
  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const updateAddressData = async () => {
    
    if (cep && cep.length === 9) {
      const cepBuscar = parseInt(cep.trim().replace("-", ""))
      
      if (!isNaN(cepBuscar) && cepBuscar.toString().length === 8) {
      const data = await importCep(cep);
      if (data) {
        setRua(data.rua);
        setBairro(data.bairro);
        setCidade(data.cidade);
        setEstado(data.estado);
      }
      }
      
    }
  };

  updateAddressData();
}, [cep]);

  const [errors, setErrors] = useState({
    nome: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const limparCampos = () => {
    setCep("");
    setNome("");
    setRua("");
    setNumero("");
    setBairro("");
    setCidade("");
    setEstado("");
  };

  useEffect(() => {
    if (editingLocal) {
      setCep(editingLocal.cep);
      setNome(editingLocal.nome);
      setRua(editingLocal.rua);
      setNumero(editingLocal.numero);
      setBairro(editingLocal.bairro);
      setCidade(editingLocal.cidade);
      setEstado(editingLocal.estado);
    } else {
      limparCampos();
    }
  }, [editingLocal]);

  const validateFields = () => {
    let hasErrors = false;
    const newErrors = {
      name: "",
      website: "",
      cnpj: "",
    };

    if (!nome) {
      hasErrors = true;
      newErrors.name = "Nome é obrigatório";
    }

    if (!cep) {
      hasErrors = true;
      newErrors.cep = "Cep é obrigatório";
    } else {
       const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(cep)) {
        return { valid: false, message: "Formato de CEP inválido" };
      }
    }

    if (!rua) {
      hasErrors = true;
      newErrors.rua = "Rua é obrigatório";
    }

    if (!numero) {
      hasErrors = true;
      newErrors.numero = "Numero é obrigatório";
    }

    if (!cidade) {
      hasErrors = true;
      newErrors.cidade = "Cidade é obrigatório";
    }

    if (!bairro) {
      hasErrors = true;
      newErrors.bairro = "Bairro é obrigatório";
    }

    if (!estado) {
      hasErrors = true;
      newErrors.rua = "Estado é obrigatório";
    }

    setErrors(newErrors);

    return !hasErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      onSubmit({ nome, cep: cep.trim().replace("-", ""), rua, numero, bairro, cidade, estado }, onCloseModal);
    }
  };

  const onCloseModal = () => {
    limparCampos();
    onClose();
  };

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
              {editingLocal ? `Editar:${nome}` : "Adicionar Local"}
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
                <InputLabel htmlFor="locationName">Nome</InputLabel>
                <OutlinedInput
                  id="locationName"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  label="Nome"
                />
                <FormHelperText>{errors.name}</FormHelperText>
              </FormControl>
              <Box display="flex" justifyContent="space-between">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.cep}
                  width="48%"
                >
                  <InputLabel htmlFor="locationCep">Cep</InputLabel>
                  <InputMask
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  >
                    {() => (
                      <OutlinedInput id="locationCep" required label="Cep" />
                    )}
                  </InputMask>
                  <FormHelperText>{errors.website}</FormHelperText>
                </FormControl>

                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.rua}
                  width="48%"
                >
                  <InputLabel htmlFor="locationRua">Rua</InputLabel>
                  <OutlinedInput
                    id="locationRua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    required
                    label="Rua"
                  />
                  <FormHelperText>{errors.rua}</FormHelperText>
                </FormControl>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.numero}
                  width="48%"
                >
                  <InputLabel htmlFor="locationNumero">Numero</InputLabel>
                  <OutlinedInput
                    id="locationNumero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                    label="Numero"
                  />
                  <FormHelperText>{errors.numero}</FormHelperText>
                </FormControl>

                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.bairro}
                  width="48%"
                >
                  <InputLabel htmlFor="locationBairro">Bairro</InputLabel>
                  <OutlinedInput
                    id="locationBairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                    label="Bairro"
                  />
                  <FormHelperText>{errors.bairro}</FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.cidade}
                  width="48%"
                >
                  <InputLabel htmlFor="locationCidade">Cidade</InputLabel>
                  <OutlinedInput
                    id="locationCidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                    label="Cidade"
                  />
                  <FormHelperText>{errors.cidade}</FormHelperText>
                </FormControl>

                <FormControl
                  margin="normal"
                  variant="outlined"
                  error={!!errors.estado}
                  width="48%"
                >
                  <InputLabel htmlFor="locationEstado">Estado</InputLabel>
                  <OutlinedInput
                    id="locationEstado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    label="Estado"
                  />
                  <FormHelperText>{errors.estado}</FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="flex-end" marginTop="1em">
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.addCompanyButton}
                >
                  {editingLocal ? "Salvar" : "Adicionar"}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateLocalModal;
