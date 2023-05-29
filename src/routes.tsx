/*  eslint-disable react/react-in-jsx-scope */
import MainLayout from '@layouts/main/main.layout';
import TestPage from '@pages/test';
import { RouteObject } from 'react-router-dom';

export default [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <TestPage />,
      },
    ],
  },
] as RouteObject[];
