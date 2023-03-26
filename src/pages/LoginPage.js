import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../components/Toast";
import AuthService from "../service/AuthService";
import { login } from "../store/slices/authSlice";

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

const LoginPage = () => {
  const companyLogo = `${process.env.PUBLIC_URL}/company-logo.png`;
  const companyImage = `${process.env.PUBLIC_URL}/company-image.png`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      showToast("error", "Por favor, corrija os erros do formulário.");
    }
  }, [errors]);

  const onSubmit = async () => {

    setLoading(true);

    try {
      const response = await AuthService.auth({ username: email, password });
      showToast("success", "Logado com sucesso!");
      AuthService.setUsuarioCorrente(response.data);
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao logar. Por favor,verifique suas credenciais e tente novamente.",
      });
      console.error(error);
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
        <form
          className={classes.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <img src={companyLogo} alt="Empresa" className={classes.logo} />
          <TextField
            sx={{ marginBottom: "1em" }}
            {...register("email", { required: "Email é obrigatório" })}
            className={classes.textField}
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            sx={{ marginBottom: "1em" }}
            className={classes.textField}
            {...register("password", { required: "Senha é obrigatória" })}
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button
            sx={{ marginBottom: "1em" }}
            className={`${classes.loginButton} ${classes.textField}`}
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </Button>
          <Button
            sx={{ backgroundColor: "#4caf50", color: "white", mb: 2 }}
            className={`${classes.registerButton} ${classes.textField}`}
            fullWidth
            variant="contained"
            size="large"
            component={Link}
            to="/register"
          >
            Criar conta
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
