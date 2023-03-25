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
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteLocationModal from "./DeleteLocal";

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

const LocationList = ({
  locations,
  handleOpenModal,
  handleEditLocation,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  loadLocations,
  totalLocations,
  handleDeleteLocation,
}) => {
  const classes = useStyles();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpenDeleteModal = (location) => {
    setSelectedLocation(location);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedLocation(null);
    setDeleteModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadLocations(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    loadLocations(0, newRowsPerPage);
  };

  return (
    <Box display="flex" flexDirection="column" p={10}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleOpenModal}
        >
          Adicionar Local
        </Button>
      </Box>
      <DeleteLocationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteLocation}
        locationName={selectedLocation?.nome}
        locationId={selectedLocation?.id}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Local</TableCell>
              
              <TableCell className={classes.tableHeader}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>{location.nome}</TableCell>
                
                <TableCell>
                  <IconButton
                    className={classes.icon}
                    color="primary"
                    onClick={() => handleEditLocation(location)}
                  >
                    <Edit />
                  </IconButton>
                
                  
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteModal(location)}
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
          count={totalLocations}
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

export default LocationList;
