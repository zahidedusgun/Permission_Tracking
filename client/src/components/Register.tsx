import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import EmailIcon from '@mui/icons-material/Email';
import HowToRegIcon from '@mui/icons-material/HowToReg';

interface LoginProps {
  setAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name:""
  });

  const { email, password, name } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:8000/auth/login", {
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
                  <EmailIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
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

export default Login;
