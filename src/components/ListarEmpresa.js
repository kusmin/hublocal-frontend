import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete, Edit, LocationOn } from "@material-ui/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCompanyModal from "./DeletaEmpresa";

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
  tableContainer: {
    width: "100%",
  },
  icon: {
    color: "black",
  },
  tableHeader: {
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
  },
}));

const CompanyList = ({
  companies,
  handleOpenModal,
  handleEditCompany,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  loadCompanies,
  totalCompanys,
  handleDeleteCompany,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleOpenDeleteModal = (company) => {
    setSelectedCompany(company);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCompany(null);
    setDeleteModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadCompanies(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    loadCompanies(0, newRowsPerPage);
  };

  const handleLocationListClick = (company) => {
    navigate(`/local`, {
      state: { locais: company.locais, nome: company.nome },
    });
  };

  return (
    <Box display="flex" flexDirection="column" p={10}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleOpenModal}
        >
          Adicionar Empresa
        </Button>
      </Box>
      <DeleteCompanyModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteCompany}
        companyName={selectedCompany?.nome}
        companyId={selectedCompany?.id}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Empresa</TableCell>
              <TableCell className={classes.tableHeader}>
                Qt de Locais
              </TableCell>
              <TableCell className={classes.tableHeader}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.nome}</TableCell>
                <TableCell>{company.qtTotalLocais}</TableCell>
                <TableCell>
                  <IconButton
                    className={classes.icon}
                    color="primary"
                    onClick={() => handleEditCompany(company)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    className={classes.icon}
                    color="primary"
                    onClick={() => handleLocationListClick(company)}
                  >
                    <LocationOn />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteModal(company)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCompanys}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Quantidade por página:"
        />
      </TableContainer>
    </Box>
  );
};

export default CompanyList;
