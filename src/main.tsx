import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import { Toaster } from 'sonner';
import Profile from "./pages/Profile.tsx";
import Initiatives from "./pages/Initiatives.tsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";
import InitiativeDetails from "./pages/InitiativeDetails.tsx";
import Applications from "./pages/Applications.tsx";
import StudentInitiativesPage from "./pages/StudentInitiatives.tsx";
import StudentsUnion from './pages/StudentsUnion.tsx';
import Students from './pages/Students.tsx';
import Statistics from "./pages/Statistics.tsx";
import keycloak from './lib/keycloak.ts';
import PrivateRoute from './PrivateRoute.tsx';
import {InitiativesProvider} from "./context/InitiativeContext.tsx";
import MyInitiatives from "./pages/MyInitiatives.tsx";
import {StudentInitiativesProvider} from "./context/StudentIniativesContext.tsx";
import {CollegeInitiativesProvider} from "./context/CollegeInitiativeContext.tsx";
import CollegeInitiatives from "./pages/CollegeInitiatives.tsx";
import Expelled from "./pages/Expelled.tsx";

const queryClient = new QueryClient()


keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
}).then((authenticated) => {
    if (authenticated) {
        localStorage.setItem("token", keycloak.token!);
        localStorage.setItem("refreshToken", keycloak.refreshToken!);
    }

    setInterval(() => {
        keycloak
            .updateToken(70)
            .then((refreshed) => {
                if (refreshed) {
                    localStorage.setItem(
                        "token",
                        keycloak.token || ""
                    );
                }
            })
            .catch(() => {
                keycloak.login();
            });
    }, 60000);

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Toaster richColors position="bottom-right" />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route element={<PrivateRoute><AuthenticatedLayout /></PrivateRoute>}>
                            <Route path="/initiatives">
                                <Route
                                    index
                                    element={
                                        <InitiativesProvider>
                                            <Initiatives />
                                        </InitiativesProvider>
                                    }
                                />

                                <Route
                                    path=":initiativeId"
                                    element={<InitiativeDetails />}
                                />
                            </Route>

                            <Route path="/my-initiatives">
                                <Route
                                    index
                                    element={
                                        <StudentInitiativesProvider>
                                            <MyInitiatives />
                                        </StudentInitiativesProvider>
                                    }
                                />

                                <Route
                                    path=":initiativeId"
                                    element={<InitiativeDetails />}
                                />
                            </Route>

                            <Route path="/our-initiatives">
                                <Route
                                    index
                                    element={
                                        <CollegeInitiativesProvider>
                                            <CollegeInitiatives/>
                                        </CollegeInitiativesProvider>
                                    }
                                />

                                <Route
                                    path=":initiativeId"
                                    element={<InitiativeDetails />}
                                />
                            </Route>

                            <Route path="/students-union">
                                <Route index element={<StudentsUnion />} />
                                {/* <Route path=":initiativeId" element={<InitiativeDetails />} /> */}
                            </Route>
                            <Route path="/students">
                                <Route index element={<Students />} />
                                {/* <Route path=":initiativeId" element={<InitiativeDetails />} /> */}
                            </Route>
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/my-applications" element={<Applications />} />
                            <Route path="/student-initiatives-participation/:id" element={<StudentInitiativesPage />} />
                            <Route path="/statistics" element={<Statistics/>}/>
                            <Route path="/expelled" element={<Expelled />} />
                            <Route
                                path="*"
                                element={
                                    <InitiativesProvider>
                                        <Initiatives />
                                    </InitiativesProvider>
                                }
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>,
    );
});
