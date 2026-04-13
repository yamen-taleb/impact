import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/test" element={<div>test</div>} />
              </Routes>
          </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
