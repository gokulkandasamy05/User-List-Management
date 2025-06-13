import React, { lazy, Suspense } from 'react';
const UserList = lazy(() => import('../pages/UserList.js'));

export const ProtectedRoutes = [
  { route: "user_list", name: "User List", component: UserList },
];