import React from "react";
import { Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "./pages";
import { AuthenticatedRoute } from "./utils";
import CompanyDashBoard from "./pages/CompanyDashboard";
import { Layout } from "./components/shared/layout";

function App() {
  return (
    <Routes>
      <Route
        path="/company/dashboard"
        element={
          <AuthenticatedRoute>
            <Layout>
              <CompanyDashBoard />
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
