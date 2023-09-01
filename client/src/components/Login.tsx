import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import "bootstrap/dist/css/bootstrap.min.css"; 
import EmailIcon from "@mui/icons-material/Email";

interface LoginProps {
  setAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
        
      }
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
            </div>
          </div>
          <div className="col-5 right-panel">
            <div className="background">
              <form onSubmit={onSubmitForm}>
                <h1 className="text-center my-5">Giriş Yap</h1>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "60px",
                    marginTop: "100px",
                  }}
                >
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    type="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    id="input-with-sx"
                    label="Kullanıcı Adınızı Giriniz"
                    variant="standard"
                    className="input"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "50px",
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
                  <button className="login-button" type="submit">
                    Giriş <LoginOutlinedIcon />
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
