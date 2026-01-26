import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { HomePage } from '../pages/HomePage';
import { ItemsPage } from '../pages/ItemsPage';
import { ItemDetailsPage } from '../pages/ItemDetailsPage';
import { LoginPage } from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PasswordReset from '../pages/PasswordReset';
import { CategoryPage } from '../pages/CategoryPage';
import { ItemEditPage } from '../pages/ItemEditPage';
import { UserItemsPage } from '../pages/UserItemsPage';
import { ChatPage } from '../pages/ChatPage';
import { Layout } from '../components/Layout';

import { ItemSuccessPage } from '../pages/ItemSuccessPage';
import { ItemCreatePage } from '../pages/ItemCreatePage';
import DashboardPage from '../pages/DashboardPage';
import LogoutPage from '../pages/LogoutPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import ProtectedRoute from '../components/auth/ProtectedRoutes';
import { ProtectedItemRouter } from '../components/Item/ProtectedItemRouter';
import { AboutUs } from '../pages/AboutUs';
import { SearchResultPage } from '../pages/SeachResultPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Imprint from '../pages/Imprint';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/items',
        element: <ItemsPage />
      },
      {
        path: '/items/:id',
        element: <ItemDetailsPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/password-reset',
        element: <PasswordReset />
      },

      { path: 'password-reset/:token', element: <ResetPasswordForm /> },

      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: '/logout',
        element: <LogoutPage />
      },
      {
        path: '/category/:category',
        element: <CategoryPage />
      },
      {
        path: 'search',
        element: <SearchResultPage />
      },
      {
        path: '/items/:id/edit',
        element: (
          <ProtectedItemRouter>
            <ItemEditPage />
          </ProtectedItemRouter>
        )
      },
      {
        path: '/items/new/create',
        element: (
          <ProtectedItemRouter>
            <ItemCreatePage />
          </ProtectedItemRouter>
        )
      },
      {
        path: '/items/success',
        element: (
          <ProtectedItemRouter>
            <ItemSuccessPage />
          </ProtectedItemRouter>
        )
      },
      {
        path: '/user/items/meine-artikel',
        element: (
          <ProtectedItemRouter>
            <UserItemsPage />
          </ProtectedItemRouter>
        )
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/chat',
        element: <ChatPage />
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />
      },
      {
        path: '/imprint',
        element: <Imprint />
      }
    ]
  }
]);
