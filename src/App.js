import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import SignupPage from "./pages/SignupPage";
import RestrictedRoute from "./utils/RestrictedRoute";
import IncubationFormPage from "./pages/IncubationFormPage";
import StatusPage from "./pages/StatusPage";
import FormRestrictedRoute from "./utils/FormRestrictedRoute";
import FormPrivateRoute from "./utils/FormPrivateRoute";
import AdminPage from "./pages/AdminPage";
import AdminPrivateRoute from "./utils/AdminPrivateRoute";
import RecordTrack from "./components/admin/RecordTrack";
import NewApplicationTable from './components/admin/NewApplicationTable'
import ApplicationView from "./components/admin/ApplicationView";
import AdminRestrictedRoute from "./utils/AdminRestrictedRoute";
import SlotManagement from "./components/admin/SlotManagement";


function App() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <AdminRestrictedRoute>
                <HomePage />
              </AdminRestrictedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPrivateRoute>
                <AdminPage>
                  <NewApplicationTable />
                </AdminPage>
              </AdminPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/record-track"
          element={
            <PrivateRoute>
              <AdminPrivateRoute>
                <AdminPage>
                  <RecordTrack />
                </AdminPage>
              </AdminPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/slot-management"
          element={
            <PrivateRoute>
              <AdminPrivateRoute>
                <AdminPage>
                  <SlotManagement />
                </AdminPage>
              </AdminPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/application/view"
          element={
            <PrivateRoute>
              <AdminPrivateRoute>
                <AdminPage>
                  <ApplicationView />
                </AdminPage>
              </AdminPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/form"
          element={
            <PrivateRoute>
              <FormPrivateRoute>
                <AdminRestrictedRoute>
                  <IncubationFormPage />
                </AdminRestrictedRoute>
              </FormPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/status"
          element={
            <PrivateRoute>
              <FormRestrictedRoute>
                <AdminRestrictedRoute>
                  <StatusPage />
                </AdminRestrictedRoute>
              </FormRestrictedRoute>
            </PrivateRoute>
          }
        />
        < Route
          path="/login"
          element={
            < RestrictedRoute >
              <LoginPage />
            </RestrictedRoute >
          }
        />
        < Route
          path="/signup"
          element={
            < RestrictedRoute >
              <SignupPage />
            </RestrictedRoute >
          }
        />
      </Routes >
    </div >
  );
}

export default App;
