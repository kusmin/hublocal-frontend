import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateLocalModal from "../components/CriarLocal";
import Header from "../components/Header";
import ListarLocais from "../components/ListarLocais";
import ProtectedLayout from "../components/ProtectedLayout";
import { showToast } from "../components/Toast";
import LocalService from "../service/LocalService";

const useStyles = makeStyles((theme) => ({
  addButton: {
    background: "#0385FD",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
    color: "white",
    fontWeight: 700,
    marginTop: "1em",
    "&:hover": {
      background: "#0361A9",
    },
  },
  backButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    background: "white", 
    color: "black", 
    "&:hover": {
      background: "#f0f0f0", 
    },
  },
}));

const Locais = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [userLocations, setUserLocations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingLocal, setEditingLocal] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalLocals, setTotalLocals] = useState(0);
  const [title, setTitle] = useState("Minhas Locals");
  const navigate = useNavigate();

  useEffect(() => {
    loadLocations(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const loadLocations = async (pagina, limite) => {
    try {
      const response = await LocalService.findAllLocais({
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        empresaId: id,
      });
      setUserLocations(response.data.locais);
      setTotalLocals(response.data.total);
    } catch (error) {
      console.error("Erro ao carregar as locals do usuário:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditLocal = (local) => {
    setEditingLocal(local);
    setOpenModal(true);
  };

  const handleCompanyAdded = async (local, callback) => {
    local.empresaId = id;
    if (editingLocal) {
      try {
        const updatedCompany = await LocalService.updateLocal(
          editingLocal.id,
          local
        );
        setUserLocations(
          userLocations.map((c) =>
            c.id === editingLocal.id ? updatedCompany.data : c
          )
        );
        handleCloseModal();
        showToast("success", "Local atualizada com sucesso!");
        callback()
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao atualizar a local. Por favor, verifique as informações inseridas e tente novamente.",
        });
        console.error(e);
      }
    } else {
      try {
        const novaLocal = await LocalService.createLocal(local);
        setUserLocations([...userLocations, novaLocal.data]);
        handleCloseModal();
        showToast("success", "Local criada com sucesso!");
        callback()
      } catch (e) {
        showToast("error",  "Ocorreu um erro ao criar a local. Por favor,verifique as informaçoes inseridas e tente novamente.");
        console.error(e);
      }
    }
  };

  const handleDeleteCompany = async (companyId, callback) => {
    try {
      await LocalService.deleteLocal(companyId);
      setUserLocations(
        userLocations.filter((company) => company.id !== companyId)
      );
      showToast("success", "Local excluída com sucesso!");
      callback();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao excluir a local. Por favor, tente novamente.",
      });
      console.error(e);
    }
  };

  return (
    <ProtectedLayout>
      <Header title={title} />
        <Button
          className={classes.backButton}
          color="primary"
          variant="contained"
          onClick={handleGoBack}
          startIcon={<ArrowBack />} // Adicione o ícone ArrowBack aqui
        >
          Minhas empresas
        </Button>
      {userLocations && userLocations.length > 0 ? (
        <Box alignItems="center" height="calc(100vh - 128px)">
          <ListarLocais
            locations={userLocations}
            handleOpenModal={handleOpenModal}
            handleEditLocation={handleEditLocal}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            loadLocations={loadLocations}
            handleDeleteLocation={handleDeleteCompany}
            totalLocations={totalLocals}
            setTitle={setTitle}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 128px)"
          flexDirection="column"
        >
          <Typography variant="h3">Nenhum local cadastrado!</Typography>
          <Button className={classes.addButton} onClick={handleOpenModal}>
            Adicionar Local
          </Button>
        </Box>
      )}

      <CreateLocalModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCompanyAdded}
        editingLocal={editingLocal}
      />
    </ProtectedLayout>
  );
};

export default Locais;
