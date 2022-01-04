import React, { useState } from "react";
import Form from "./Form";

export default function CreateCustomer(props) {
  const [name, setName] = useState("");
  const [organisationNr, setOrganisationNr] = useState("");
  const [vatNr, setVatNr] = useState("");
  const [reference, setReference] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "https://frebi.willandskill.eu/api/v1/customers/";
    const payload = {
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber,
    };
    const token = localStorage.getItem("task");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => props.onSuccess());
  }
  return (
    <div>
      <Form
        name={name}
        setName={setName}
        organisationNr={organisationNr}
        setOrganisationNr={setOrganisationNr}
        vatNr={vatNr}
        setVatNr={setVatNr}
        reference={reference}
        setReference={setReference}
        paymentTerm={paymentTerm}
        setPaymentTerm={setPaymentTerm}
        website={website}
        setWebsite={setWebsite}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        buttonName="Create customer"
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
}
