import {
  Box,
  Button,
  Divider,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { AccountCircle } from "@mui/icons-material";
import logo from "../../assets/logoPdTec.png";
import { useEffect, useState } from "react";
import {
  consultarCep,
  deletarUsuario,
  editarUsuario,
  getUsuario,
} from "../../service/api";
import { FieldError, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import cnpj from "validation-br/dist/cnpj";
import cpf from "validation-br/dist/cpf";
import { User } from "../../interfaces";
import toast from "react-hot-toast";

export function Perfil() {
  const [usuario, setUsuario] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsuario();
        setUsuario(response);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: any, fieldName: string) => {
    const { value } = event.target;
    setUsuario((prevUser) => ({
      ...prevUser!,
      [fieldName]: value,
    }));
  };

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

  function validatorCpjCnpj(value: string) {
    const isCpfValid = cpf(value);
    const isCnpjValid = cnpj(value);

    if (!isCpfValid && !isCnpjValid) {
      setError("cpf", {
        type: "manual",
        message: "CPF inválido",
      });
      console.log("CPF inválido");
      setIsLoading(false);
      return;
    } else {
      clearErrors("cpf");
    }
  }

  async function excluirConta() {
    if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
      try {
        await deletarUsuario();
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir a conta do usuário:", error);
      }
    }
  }

  async function onSubmit() {
    setIsLoading(true);
    try {
      await editarUsuario(usuario);
      toast.success("Alterações salvas com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao salvar alterações do usuário:", error);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "64px",
            backgroundColor: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <Box>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "48px", width: "auto", cursor: "pointer" }}
              onClick={() => navigate("/home")}
            />
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "1rem" }}
          >
            <Typography variant="body1" sx={{ color: "#fff", marginRight: 1 }}>
              {(usuario && usuario!.name) || "Nome do Usuário"}
            </Typography>
            <Avatar alt={(usuario && usuario!.name) || "Nome do Usuário"} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
            width: "75%",
            height: "90%",
            marginTop: "2rem",
            borderRadius: "10px",
            overflowY: "scroll",
            backgroundColor: "#fff",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h5"
              sx={{
                justifyContent: "center",
                display: "flex",
                marginTop: "3rem",
              }}
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
                value={usuario?.name || ""}
                {...register("name", {})}
                error={!!errors.name}
                onChange={(e) => handleChange(e, "name")}
                helperText={(errors.name as FieldError)?.message || ""}
              />
              <TextField
                type="text"
                variant="filled"
                label="Email"
                sx={{
                  width: ["100%", "100%", "100%", "67%"],
                }}
                value={usuario?.email || ""}
                {...register("email", {})}
                error={!!errors.email}
                helperText={(errors.email as FieldError)?.message || ""}
                onChange={(e) => {
                  validatorEmail(e.target.value);
                  handleChange(e, "email");
                }}
              />
              <TextField
                type="text"
                variant="filled"
                label="CPF"
                sx={{
                  width: ["100%", "100%", "100%", "67%"],
                }}
                value={usuario?.cpf || ""}
                {...register("cpf", {})}
                error={!!errors.cpf}
                inputProps={{ maxLength: 14 }}
                onChange={(e) => {
                  validatorCpjCnpj(e.target.value);
                  handleChange(e, "cpf");
                }}
                helperText={(errors.cpf as FieldError)?.message || ""}
              />
              <TextField
                type="text"
                variant="filled"
                label="Cargo"
                sx={{
                  width: ["100%", "100%", "100%", "67%"],
                }}
                value={usuario?.role || ""}
                {...register("role")}
                onChange={(e) => handleChange(e, "role")}
                error={!!errors.role}
                helperText={(errors.role as FieldError)?.message || ""}
              />
            </Box>
            <Box
              sx={{
                "@media (max-width: 900px)": {
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                },
                marginLeft: "0.6rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                gap: "3rem",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  padding: "0.8rem",
                  width: "150px",
                  height: "45px",
                  backgroundColor: "#006791",
                }}
                onClick={() => navigate("/home")}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  padding: "0.8rem",
                  width: "150px",
                  height: "45px",
                }}
              >
                {!isLoading ? "Editar" : "Editando..."}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  padding: "0.8rem",
                  width: "150px",
                  height: "45px",
                }}
                onClick={excluirConta}
              >
                Excluir Conta
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
