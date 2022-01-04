import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserCreatePage from "./pages/UserCreatePage";

const NameContext = createContext({});

function App() {
  const [customersList, setCustomersList] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchMyInformation();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, []);

  function fetchMyInformation() {
    const token = localStorage.getItem("task");

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const url = "https://frebi.willandskill.eu/api/v1/me";
      fetch(url, {
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
        });
    }
  }

  function fetchCustomers() {
    const token = localStorage.getItem("task");
    if (token) {
      const url = "https://frebi.willandskill.eu/api/v1/customers/";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      fetch(url, {
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setCustomersList(data.results);
        });
    }
  }

  return (
    <NameContext.Provider
      value={{ userInfo, setUserInfo, customersList, setCustomersList }}
    >
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                refreshCustomers={fetchCustomers}
                refreshMyInfo={fetchMyInformation}
              />
            }
          />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/home" element={<HomePage refresh={fetchCustomers} />} />
          <Route
            path="/customers/:id"
            element={<CustomerDetailPage refresh={fetchCustomers} />}
          />
        </Routes>
      </div>
    </NameContext.Provider>
  );
}

export { NameContext };
export default App;
