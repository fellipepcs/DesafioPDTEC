import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import cnpj from "validation-br/dist/cnpj";
import cpf from "validation-br/dist/cpf";
import { cadastrarUsuario } from "../../service/api";

export default function Cadastro() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  function validatorCpjCnpj(value: string) {
    const isCpfValid = cpf(value);
    const isCnpjValid = cnpj(value);

    if (!isCpfValid && !isCnpjValid) {
      setError("cpf", {
        type: "manual",
        message: "CPF inválido",
      });
      setIsLoading(false);
      return;
    } else {
      clearErrors("cpf");
    }
  }

  function validatorEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("email", {
        type: "manual",
        message: "Formato de e-mail inválido",
      });
    } else {
      clearErrors("email");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);

    const response = await cadastrarUsuario(data);

    if (response["message"]) {
      navigate("/login");
    } else {
      toast.error(response);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            marginBottom: "30px",
            width: "75%",
            height: "90%",
            borderRadius: "10px",
            overflowY: "scroll",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ justifyContent: "center", display: "flex", marginTop: "3rem"}}
            gutterBottom
          >
            Dados Pessoais
          </Typography>
          <Divider sx={{ margin: "0.8rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
              marginLeft: "1rem",
            }}
          >
            <TextField
              type="text"
              variant="filled"
              label="Nome"
              sx={{
                width: ["100%", "100%", "100%", "67%"],
              }}
              {...register("name", {
                required: "Este campo é obrigatório para Nome",
              })}
              error={!!errors.name}
              helperText={(errors.name as FieldError)?.message || ""}
            />
            <TextField
              type="password"
              variant="filled"
              label="Senha"
              sx={{
                width: ["100%", "100%", "100%", "67%"],
              }}
              {...register("password", {
                required: "Este campo é obrigatório para Senha",
              })}
              error={!!errors.password}
              helperText={(errors.password as FieldError)?.message || ""}
            />
            <TextField
              type="text"
              variant="filled"
              label="Email"
              sx={{
                width: ["100%", "100%", "100%", "67%"],
              }}
              {...register("email", {
                required: "Este campo é obrigatório para Email",
              })}
              error={!!errors.email}
              helperText={(errors.email as FieldError)?.message || ""}
              onChange={(e) => validatorEmail(e.target.value)}
            />
            <TextField
              type="text"
              variant="filled"
              label="CPF/CNPJ"
              sx={{
                width: ["100%", "100%", "100%", "67%"],
              }}
              {...register("cpf", {
                required: "Este campo é obrigatório para CPF",
              })}
              error={!!errors.cpf}
              inputProps={{ maxLength: 14 }}
              onChange={(e) => validatorCpjCnpj(e.target.value)}
              helperText={(errors.cpf as FieldError)?.message || ""}
            />
            <TextField
              type="text"
              variant="filled"
              label="Cargo"
              sx={{
                width: ["100%", "100%", "100%", "67%"],
              }}
              {...register("role", {
                required: "Este campo é obrigatório para Cargo",
              })}
              error={!!errors.role}
              helperText={(errors.role as FieldError)?.message || ""}
            />
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                padding: "0.8rem",
                width: "236px",
              }}
              disabled={isLoading}
            >
              {!isLoading ? "Finalizar" : "Finalizando..."}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
