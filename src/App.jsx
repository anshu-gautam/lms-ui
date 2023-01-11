import React from "react";
import { Route, Routes } from "react-router-dom";

import { SignIn, SignUp, Dashboard } from "./pages";
import { AuthenticatedRoute, userData } from "./utils";
import { Layout } from "./components/shared/layout";
import Userprofile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthenticatedRoute>
            <Layout>
              <Userprofile />
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
