import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CreateCustomer from "../components/CreateCustomer";
import { NameContext } from "../App";

import Card from "../components/Card";
import Cap from "../components/Cap";
import Garland from "../components/Garland";
import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";
import PrivateRoute from "../components/PrivateRoute";

export default function HomePage(props) {
  //   props.refresh();
  const { userInfo, customersList } = useContext(NameContext);

  return (
    <PrivateRoute>
      <div>
        <Heading h1>Home Page</Heading>
        <Garland />
        {userInfo && (
          <div>
            <Heading h2>My information</Heading>
            <Card>
              <Cap />
              <p>
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <p>{userInfo.email}</p>
            </Card>
          </div>
        )}
        <Heading h2>Create customer</Heading>
        <CreateCustomer onSuccess={props.refresh} />
        <Garland />
        <Heading h2>Customer list</Heading>
        <FormContainer>
          {customersList &&
            customersList.map((item, index) => {
              return (
                <div key={item.id}>
                  <ul>
                    <li key={item.id}>
                      <Link to={`/customers/${item.id}`}>{item.name}</Link>
                    </li>
                  </ul>
                </div>
              );
            })}
        </FormContainer>
      </div>
    </PrivateRoute>
  );
}
