import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PurchasesProvider } from "@/contexts/PurchasesContext";
import { ReviewsProvider } from "@/contexts/ReviewsContext";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import EducatorDashboard from "./pages/dashboard/EducatorDashboard";
import MarketerDashboard from "./pages/dashboard/MarketerDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import BundlesPage from "./pages/BundlesPage";
import BundleDetail from "./pages/BundleDetail";
import EducatorAnalytics from "./pages/analytics/EducatorAnalytics";
import MarketerAnalytics from "./pages/analytics/MarketerAnalytics";
import StudentAnalytics from "./pages/analytics/StudentAnalytics";
import StudentPurchases from "./pages/purchases/StudentPurchases";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import AISuggestionsPage from "./pages/AISuggestionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <PurchasesProvider>
              <ReviewsProvider>
                <ChatbotProvider>
              <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="educator"
                element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="marketer"
                element={
                  <ProtectedRoute allowedRoles={['marketer']}>
                    <MarketerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Use explicit 'role' prefix to avoid conflict with course id route */}
              <Route path="role/:role" element={<CoursesPage />} />
            </Route>

            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CourseDetail />} />
            </Route>

            <Route
              path="/bundles"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Use explicit 'role' prefix to avoid conflict with bundle id route */}
              <Route path="role/:role" element={<BundlesPage />} />
            </Route>

            <Route
              path="/bundles/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BundleDetail />} />
            </Route>

            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={['educator', 'marketer']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentsPage />} />
              <Route path="educator" element={<StudentsPage />} />
              <Route path="marketer" element={<StudentsPage />} />
            </Route>

            <Route
              path="/teachers"
              element={
                <ProtectedRoute allowedRoles={['marketer']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TeachersPage />} />
              <Route path="marketer" element={<TeachersPage />} />
            </Route>
            
            <Route
              path="/ai-suggestions"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AISuggestionsPage />} />
              <Route path="marketer" element={<AISuggestionsPage />} />
              <Route path="student" element={<AISuggestionsPage />} />
              <Route path="educator" element={<AISuggestionsPage />} />
            </Route>

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="educator" element={<EducatorAnalytics />} />
              <Route path="marketer" element={<MarketerAnalytics />} />
              <Route path="student" element={<StudentAnalytics />} />
            </Route>

            <Route
              path="/purchases"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="student" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentPurchases />
                </ProtectedRoute>
              } />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
              </ChatbotProvider>
            </ReviewsProvider>
          </PurchasesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
