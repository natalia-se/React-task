import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";
import Garland from "../components/Garland";
import Cap from "../components/Cap";

export default function UserCreatePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const navigate = useNavigate();

  function renderInput(type, value, setValue, placeholder) {
    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "https://frebi.willandskill.eu/auth/users/";
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => navigate("/login"));
  }

  return (
    <div>
      <Garland />
      <Heading h1>Create user</Heading>
      <FormContainer>
        <Cap />
        <form onSubmit={handleOnSubmit}>
          {renderInput("text", firstName, setFirstName, "First Name")}
          {renderInput("text", lastName, setLastName, "Last Name")}
          {renderInput(
            "text",
            organisationName,
            setOrganisationName,
            "Organisation Name"
          )}
          {renderInput(
            "text",
            organisationKind,
            setOrganisationKind,
            "Organisation Kind"
          )}
          {renderInput("text", email, setEmail, "Email")}
          {renderInput("password", password, setPassword, "Password")}
          <Button type="submit" value="Create User"></Button>
        </form>
      </FormContainer>
    </div>
  );
}
