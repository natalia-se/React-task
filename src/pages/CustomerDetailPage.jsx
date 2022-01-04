import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NameContext } from "../App";

import Form from "../components/Form";
import Garland from "../components/Garland";
import Heading from "../components/Heading";
import Button from "../components/Button";
import PrivateRoute from "../components/PrivateRoute";

export default function CustomerDetailPage(props) {
  const params = useParams();
  const id = parseInt(params.id);
  const { customersList } = useContext(NameContext);
  const customer = customersList.find((c) => c.id === id);

  const navigate = useNavigate();
  const url = `https://frebi.willandskill.eu/api/v1/customers/${id}/`;

  const [name, setName] = useState(customer.name);
  const [organisationNr, setOrganisationNr] = useState(customer.organisationNr);
  const [vatNr, setVatNr] = useState(customer.vatNr);
  const [reference, setReference] = useState(customer.reference);
  const [paymentTerm, setPaymentTerm] = useState(customer.paymentTerm);
  const [website, setWebsite] = useState(customer.website);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

  function handleOnSubmit(e) {
    e.preventDefault();
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
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((res) => {
      navigate("/home");
      props.refresh();
    });
  }

  function handleOnDelete(id) {
    // console.log(id);
    const token = localStorage.getItem("task");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      headers: headers,
      method: "DELETE",
    }).then((res) => {
      navigate("/home");
      props.refresh();
    });
  }

  return (
    <PrivateRoute>
      <div>
        <Garland />
        {customersList && (
          <>
            <Heading h1>{customer.name}</Heading>

            <Button
              onClick={(e) => handleOnDelete(customer.id)}
              defaultValue="DELETE CUSTOMER"
            ></Button>
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
              buttonName="Update information"
              handleOnSubmit={handleOnSubmit}
            />
          </>
        )}
      </div>
    </PrivateRoute>
  );
}
