import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Cap from "../components/Cap";
import FormContainer from "../components/FormContainer";
import Garland from "../components/Garland";
import Heading from "../components/Heading";
import Input from "../components/Input";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams(document.location.search);
  const activateToken = params.get("token");

  function activate() {
    const uid = params.get("uid");
    const url = "https://frebi.willandskill.eu/auth/users/activate/";
    const payload = {
      uid: uid,
      token: activateToken,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((res) => navigate("/login"));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { email, password };

    const url = "https://frebi.willandskill.eu/api-token-auth/";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("task", token);
        props.refreshCustomers();
        props.refreshMyInfo();
        navigate("/home");
      });
  }

  return (
    <div>
      {activateToken ? (
        <>
          <Garland />
          <Heading h1>Activation</Heading>
          <FormContainer>
            <Button type="submit" onClick={activate} value="Confirm"></Button>
          </FormContainer>
        </>
      ) : (
        <>
          <Garland />
          <Heading h1>Login</Heading>
          <FormContainer>
            <Cap />
            <form onSubmit={handleOnSubmit}>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" value="Login" />
            </form>
          </FormContainer>
        </>
      )}
    </div>
  );
}
