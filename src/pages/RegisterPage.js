import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../components/Toast";
import AuthService from "../service/AuthService";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "#0485FF",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  paper: {
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    padding: theme.spacing(2),
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
    zIndex: -1,
  },
  greenBox: {
    margin: "0 auto",
    maxWidth: "500px",
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
  },
  logo: {
    width: "100%",
    maxWidth: "200px",
    marginBottom: theme.spacing(3),
  },
  boxContainer: {
    position: "absolute",
    bottom: 0,
    minHeight: "15vh",
    width: "100%",
    backgroundColor: "#00CC99",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  greenBoxTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins",
  },
  greenBoxText: {
    color: "#fff",
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins",
  },
  registerButton: {
    backgroundColor: "#2196f3",
    color: "white",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#4caf50",
    color: "white",
    width: "100%",
  },
}));

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();

  const companyLogo = `${process.env.PUBLIC_URL}/company-logo.png`;
  const companyImage = `${process.env.PUBLIC_URL}/company-image.png`;
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const onSubmit = async (data) => {
    if (!validateForm()) {
      return;
    }

    try {
      await AuthService.register({
        nome: data.name,
        email: data.email,
        senha: data.password,
      });
      showToast("success", "Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      let text = "Ocorreu um erro ao criar a conta. Por favor, tente novamente.";
      if (error && error.response && error.response.data && error.response.data.message && error.response.data.message === "Email já cadastrado.") {
        text = "Já existe uma conta cadastrada com este email."
      }
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: text,
      });
      console.error("Erro ao criar a conta:", error);
    }
  };

  const validateForm = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Por favor, preencha todos os campos.",
      });
      return false;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "As senhas não coincidem. Por favor, verifique e tente novamente.",
      });
      return false;
    }

    return true;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Paper
          className={classes.leftSection}
          elevation={0}
          style={{
            backgroundColor: "#0485FF",
            backgroundImage: `url(${companyImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Box
            className={classes.boxContainer}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 700,
                fontFamily: "Poppins",
                textAlign: "center",
                fontSize: "2em",
                width: "60%",
              }}
            >
              Junte-se a vários clientes satisfeitos.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: 400,
                fontFamily: "Poppins",
                textAlign: "center",
                fontSize: "1em",
                width: "60%",
              }}
            >
              Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
              Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} className={classes.rightSection}>
        <img src={companyLogo} alt="Empresa" className={classes.logo} />
        <form
          className={classes.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("name", { required: true })}
            name="name"
            label="Nome"
            fullWidth
            variant="outlined"
            error={errors?.name}
            helperText={errors?.name && "Nome é obrigatório"}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("email", { required: true })}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            error={errors?.email}
            helperText={errors?.email && "Email é obrigatório"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("password", { required: true })}
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            error={errors?.password}
            helperText={errors?.password && "Senha é obrigatória"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("confirmPassword", { required: true })}
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            fullWidth
            variant="outlined"
            error={errors?.confirmPassword}
            helperText={
              errors?.confirmPassword && "Confirmação de senha é obrigatória"
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            sx={{ marginBottom: "1em" }}
            className={`${classes.registerButton} mb-4`}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            Registrar
          </Button>
          <Button
            sx={{ backgroundColor: "#4caf50", color: "white", mb: 2 }}
            className={`${classes.loginButton} ${classes.textField}`}
            fullWidth
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            
          >
            Logar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
