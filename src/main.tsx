import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
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
import { CategoryProvider } from "./context/CategoryContext.tsx";
import {CollegeProvider} from "./context/CollegeContext.tsx";
import {InitiativesProvider} from "./context/InitiativeContext.tsx";

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
                <CategoryProvider>
                    <CollegeProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route element={<PrivateRoute><AuthenticatedLayout /></PrivateRoute>}>
                                    <Route path="/initiatives">
                                        <Route index element={
                                            <InitiativesProvider>
                                                <Initiatives />
                                            </InitiativesProvider>
                                        } />
                                        <Route path=":initiativeId" element={<InitiativeDetails />} />
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
                                    <Route path="*" element={<Initiatives />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </CollegeProvider>
                </CategoryProvider>
            </QueryClientProvider>
        </StrictMode>,
    );
});
