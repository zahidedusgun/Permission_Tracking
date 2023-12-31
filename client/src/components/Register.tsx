import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from "@mui/icons-material/Email";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";

interface LoginProps {
  setAuth: (value: boolean) => void;
}

const Register: React.FC<LoginProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
  });

  const { email, password, name } = inputs;
  const [department, setDepartment] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      console.log(parseRes);

      setAuth(true);
    } catch (err) {
      console.error((err as Error).message);

    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-7 left-panel" style={{ height: "100vh" }}>
            <div className="welcome">
              <div className="logo"></div>
              <p>
                İZİN TAKİP SİSTEMİNE <br />
                HOŞGELDİNİZ
              </p>
              <button
                style={{
                  width: "25%",
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "14px 20px",
                  margin: "8px 0",
                  marginLeft: "-70px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  alignContent: "right",
                }}
              >
                Giriş yap
              </button>
            </div>
          </div>
          <div className="col-5 right-panel">
            <div className="background">
              <form onSubmit={onSubmitForm}>
                <h1 className="text-center my-5">Kayıt Ol </h1>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <AccountCircleOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    type="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    id="input-with-sx"
                    label="Kullanıcı Adı Giriniz"
                    variant="standard"
                    className="input"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    id="input-with-sx"
                    label="Email Giriniz"
                    variant="standard"
                    className="input"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <BusinessCenterIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Departman
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={department}
                      onChange={handleChange}
                      label="Departman"
                    >
                    
                      <MenuItem value={10}>Full Stack</MenuItem>
                      <MenuItem value={20}>Gömülü</MenuItem>
                      <MenuItem value={30}>İnsan Kaynakları</MenuItem>
                      <MenuItem value={40}>Veri Bilimi</MenuItem>
                      <MenuItem value={50}>ArGe</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "70px",
                  }}
                >
                  <VpnKeyOutlinedIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    id="input-with-sx"
                    label="Şifrenizi Giriniz"
                    variant="standard"
                    className="input"
                  />
                </Box>

                <div className="buttons">
                  {" "}
                  <button className="register-but">
                    Kayıt Ol <HowToRegIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
