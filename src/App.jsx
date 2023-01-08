import React from "react";
import { Route, Routes } from "react-router-dom";

import { SignIn, SignUp, CompanyDashboard, UserDashboard } from "./pages";
import { AuthenticatedRoute } from "./utils";
import { Layout } from "./components/shared/layout";
import OrderStats from "./components/orders/OrderStats";

function App() {
  return (
    <Routes>
      <Route
        path="/company/dashboard"
        element={
          <AuthenticatedRoute>
            <Layout>
              <CompanyDashboard />
            </Layout>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Layout>
              <UserDashboard />
            </Layout>
          </AuthenticatedRoute>
        }
      />
      
      
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
