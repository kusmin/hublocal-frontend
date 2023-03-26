import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
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

  greenBoxText: {
  color: "#fff",
  marginBottom: theme.spacing(3),
  width: "60%",
  fontFamily: "Poppins",
  textAlign: "center",
  fontSize: "1em",
  display: "block",
  },
  greenBoxTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: "2em",
    width: "60%",
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
  registerButton: {
    backgroundColor: "#2196f3",
    color: "white",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#4caf50",
    color: "white",
    marginBottom: theme.spacing(2),
    width: "100%",
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
    color: "#fff",
  },
}));

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const companyLogo = `${process.env.PUBLIC_URL}/company-logo.png`;
  const companyImage = `${process.env.PUBLIC_URL}/company-image.png`;
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await AuthService.register({
        nome: nome,
        email: email,
        senha: password,
      });
      showToast("success", "Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      let text =
        "Ocorreu um erro ao criar a conta. Por favor, tente novamente.";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message === "Email já cadastrado."
      ) {
        text = "Já existe uma conta cadastrada com este email.";
      }
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: text,
      });
      console.error("Erro ao criar a conta:", error);
    } finally {
      setLoading(false);
    }
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
            <Typography variant="h6" className={classes.greenBoxTitle}>
              Junte-se a vários clientes satisfeitos.
            </Typography>
            <Typography variant="body1" className={classes.greenBoxText}>
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
            {...register("nome", { required: "Nome é obrigatório" })}
            name="nome"
            label="Nome"
            fullWidth
            variant="outlined"
            error={Boolean(errors.nome)}
            helperText={errors.nome?.message}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 dígitos",
              },
            })}
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("confirmPassword", {
              required: "Confirmação de senha é obrigatória",
              validate: (value) =>
                value === watch("password") || "As senhas não coincidem",
            })}
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            fullWidth
            variant="outlined"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
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
            disabled={loading}
          >
            {loading ? "Carregando..." : "Registrar"}
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
