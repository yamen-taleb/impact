import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import Profile from "./pages/Profile.tsx";
import Initiatives from "./pages/Initiatives.tsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route element={<AuthenticatedLayout />}>
                      <Route path="/initiatives" element={<Initiatives />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<Initiatives />} />
                  </Route>
              </Routes>
          </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
