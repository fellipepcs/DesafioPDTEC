import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/api";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: any) {
    setIsLoading(true);

    const user = await login(data.email, data.senha);
    console.log(user);
    if (user["token"]) {
      navigate("/home");
    } else {
      toast.error(user);
    }

    setIsLoading(false);
  }

  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1E1E1E",
        }}
      >
        <Box
          sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "60px",
              marginBottom: "30px",
              width: "100%",
            }}
            >
          <Typography
            sx={{
                fontSize: "22px",
                color: "#fff",
                marginBottom: "30px",
                textAlign: "center",
            }}
            >
            Seja bem vindo à plataforma de pesquisa por CEP
          </Typography>
          <Typography
            sx={{
                fontSize: "22px",
                color: "#fff",
                marginBottom: "30px",
                textAlign: "center",
            }}
            >
            Insira seu usuário e senha abaixo para ter acesso a plataforma.
          </Typography>
        </Box>

        <Box
          sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
              <TextField
                type="text"
                variant="standard"
                label="Email"
                sx={{
                    paddingTop: "1rem",
                    width: "350px",
                    marginBottom: "1rem",
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                    },
                    "& .MuiInputBase-input": {
                        color: "white",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                    },
                }}
                {...register("email", {
                    required: "Este campo é obrigatório",
                })}
                />
              <TextField
                type="password"
                variant="standard"
                label="Senha"
                sx={{
                    paddingTop: "1rem",
                    width: "350px",
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                    },
                    "& .MuiInputBase-input": {
                        color: "white",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                    },
                }}
                {...register("senha", { required: "Este campo é obrigatório" })}
                />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                    marginTop: "4rem",
                    padding: "0.8rem",
                    justifyContent: "center",
                    width: "70%",
                }}
                disabled={isLoading}
                >
                {!isLoading ? "Acessar" : "Acessando"}
              </Button>
            </Box>
          </form>
        </Box>
        <Typography
          sx={{
            marginTop: "45px",
            fontSize: "22px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Primeira vez por aqui?{" "}
          <Link to="/cadastro" style={{ textDecoration: "none", color: "white" }}>
            <strong>Cadastre-se</strong>
          </Link>
        </Typography>
      </Box>
    </div>
  );
}
