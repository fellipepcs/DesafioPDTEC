import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { AccountCircle } from "@mui/icons-material";
import logo from "../../assets/logoPdTec.png";
import { useEffect, useState } from "react";
import { consultarCep, getUsuario } from "../../service/api";
import { FieldError, set, useForm } from "react-hook-form";
import { DadosCep, User } from "../../interfaces";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [cepData, setCepData] = useState<DadosCep>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsuario();
        setUsuario(response);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await consultarCep(data.cep);

    if (response["erro"]) {
      toast.error("CEP inválido ou não encontrado!");
      return;
    } else {
      setCepData(response);
      setIsPopoverOpen(true);
    }
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
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
        }}
      >
        <Box>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "48px", width: "auto" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ color: "#fff", marginRight: 1 }}>
            {(usuario && usuario!.name) || "Nome do Usuário"}
          </Typography>
          <Avatar alt={(usuario && usuario!.name) || "Nome do Usuário"} />
          <Button
            variant="outlined"
            startIcon={<AccountCircle />}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              marginLeft: 1,
              marginRight: 1,
            }}
            onClick={() => {
              navigate("/perfil");
            }}
          >
            Perfil
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              marginLeft: 1,
              marginRight: 1,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Sair
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "30px",
          alignItems: "center",
          marginBottom: "30px",
          width: "35%",
          height: "40%",
          borderRadius: "10px",
          justifyContent: "center",
          backgroundColor: "#fff",
          "@media (max-width: 900px)": {
            width: "90%",
            height: "45%",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
          }}
        >
          Consulta CEP
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="cep"
            label="CEP"
            variant="filled"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 8 }}
            {...register("cep", {
              required: "Este campo é obrigatório para CEP",
            })}
            error={!!errors.cep}
            helperText={(errors.cep as FieldError)?.message || ""}
          />
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" type="submit">
              Consultar
            </Button>
          </Box>
        </form>
        <Popover
          open={isPopoverOpen}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {cepData && (
            <Box sx={{ padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Dados do CEP
              </Typography>
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body1">CEP: {cepData.cep}</Typography>
                <Typography variant="body1">
                  Logradouro: {cepData.logradouro}
                </Typography>
                <Typography variant="body1">
                  Complemento: {cepData.complemento || "Não informado"}
                </Typography>
                <Typography variant="body1">
                  Bairro: {cepData.bairro}
                </Typography>
                <Typography variant="body1">
                  Localidade: {cepData.localidade}
                </Typography>
                <Typography variant="body1">UF: {cepData.uf}</Typography>
                <Typography variant="body1">IBGE: {cepData.ibge}</Typography>
                <Typography variant="body1">DDD: {cepData.ddd}</Typography>
                <Typography variant="body1">SIAFI: {cepData.siafi}</Typography>
              </Box>
            </Box>
          )}
        </Popover>
      </Box>
    </Box>
  );
}
