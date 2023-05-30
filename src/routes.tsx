/*  eslint-disable react/react-in-jsx-scope */
import { NavItemType } from '@components/ui/navigation/navigation.types';
import MainLayout from '@layouts/main/main.layout';
import TestPage from '@pages/test';
import { Calendar1, KyberNetwork, Messages2 } from 'iconsax-react';
import { RouteObject } from 'react-router-dom';

export const routes = [
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

export const menus: NavItemType[] = [
  {
    id: 'portal',
    title: 'Portal',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        url: '/',
        icon: KyberNetwork,
        type: 'item',
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: KyberNetwork,
        type: 'item',
      },
      {
        id: 'live',
        title: 'Live',
        icon: KyberNetwork,
        type: 'item',
      },
    ],
  },
  {
    id: 'order',
    title: 'Pesanan',
    icon: KyberNetwork,
    type: 'group',
    children: [
      {
        id: 'order-retail',
        title: 'Retail',
        type: 'item',
        icon: Messages2,
        breadcrumbs: false,
      },
      {
        id: 'order-resale',
        title: 'Resale',
        type: 'item',
        icon: Calendar1,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'product',
    title: 'Produk',
    icon: KyberNetwork,
    type: 'group',
    children: [
      {
        id: 'product-list',
        title: 'Daftar Produk',
        type: 'item',
        icon: Messages2,
        breadcrumbs: false,
      },
      {
        id: 'product-add',
        title: 'Tambah Produk',
        type: 'item',
        icon: Calendar1,
        breadcrumbs: false,
      },
      {
        id: 'product-inventory',
        title: 'Inventory',
        type: 'item',
        icon: Calendar1,
        breadcrumbs: false,
      },
    ],
  },
];
