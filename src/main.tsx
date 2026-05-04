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

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route element={<AuthenticatedLayout />}>
                      <Route path="/initiatives">
                          <Route index element={<Initiatives />} />
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
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/my-applications" element={<Applications />} />
                      <Route path="/student-initiatives-participation/:id" element={<StudentInitiativesPage />} />
                      <Route path="/statistics" element={<Statistics/>}/>
                      <Route path="*" element={<Initiatives />} />
                  </Route>
              </Routes>
          </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
