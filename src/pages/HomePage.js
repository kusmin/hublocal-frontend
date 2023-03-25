import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateCompanyModal from "../components/CriarEmpresa";
import Header from "../components/Header";
import CompanyList from "../components/ListarEmpresa";
import ProtectedLayout from "../components/ProtectedLayout";
import { showToast } from "../components/Toast";
import EmpresaService from "../service/EmpresaService";

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
}));

const HomePage = () => {
  const classes = useStyles();
  const [userCompanies, setUserCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [title, setTitle] = useState("Minhas Empresas");

  useEffect(() => {
    loadCompanies(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const loadCompanies = async (pagina, limite) => {
    try {
      const response = await EmpresaService.findAllEmpresas({
        pagina: parseInt(pagina),
        limite: parseInt(limite),
      });
      setUserCompanies(response.data.empresas);
      setTotalEmpresas(response.data.totalEmpresas);
    } catch (error) {
      console.error("Erro ao carregar as empresas do usuário:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setOpenModal(true);
  };

  const handleCompanyAdded = async (company, callback) => {
    if (editingCompany) {
      try {
        const updatedCompany = await EmpresaService.updateEmpresa(
          editingCompany.id,
          company
        );
        setUserCompanies(
          userCompanies.map((c) =>
            c.id === editingCompany.id ? updatedCompany.data : c
          )
        );
        handleCloseModal();
        showToast("success", "Empresa atualizada com sucesso!");
        callback()
      } catch (e) {
        showToast(
          "error",
          "Ocorreu um erro ao atualizar a empresa. Por favor, verifique as informações inseridas e tente novamente."
        );
        console.error(e);
      }
    } else {
      try {
        const novaEmpresa = await EmpresaService.createEmpresa(company);
        setUserCompanies([...userCompanies, novaEmpresa.data]);
        handleCloseModal();
        showToast("success", "Empresa criada com sucesso!");
        callback()
      } catch (e) {
        showToast(
          "error",
          "Ocorreu ao criar a empresa. Por favor,verifique as informaçoes inseridas e tente novamente."
        );
        console.error(e);
      }
    }
  };

  const handleDeleteCompany = async (companyId, callback) => {
    try {
      await EmpresaService.deleteEmpresa(companyId);
      setUserCompanies(
        userCompanies.filter((company) => company.id !== companyId)
      );
      showToast("success", "Empresa excluída com sucesso!");
      callback();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao excluir a empresa. Por favor, tente novamente.",
      });
      console.error(e);
    }
  };

  return (
    <ProtectedLayout>
      <Header title={title} />
      {userCompanies && userCompanies.length > 0 ? (
        <Box alignItems="center" height="calc(100vh - 128px)">
          <CompanyList
            companies={userCompanies}
            handleOpenModal={handleOpenModal}
            handleEditCompany={handleEditCompany}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            loadCompanies={loadCompanies}
            handleDeleteCompany={handleDeleteCompany}
            totalCompanys={totalEmpresas}
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
          <Typography variant="h3">Nenhuma empresa cadastrada!</Typography>
          <Button className={classes.addButton} onClick={handleOpenModal}>
            Adicionar Empresa
          </Button>
        </Box>
      )}

      <CreateCompanyModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCompanyAdded}
        editingCompany={editingCompany}
      />
    </ProtectedLayout>
  );
};

export default HomePage;
