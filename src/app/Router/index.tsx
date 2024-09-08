import { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import { Confirm } from '@/views/pages/Confirm';
import { SignIn } from '@/views/pages/Signin';
import { SignUp } from '@/views/pages/Signup';
import { lazyLoad } from '@app/utils/lazyLoad';
import { AuthGuard } from './AuthGuard';

const { Home } = lazyLoad(() => import('@views/pages/Home'));

export function Router() {
  return (
    <Suspense fallback={<div className="w-10 h-10 rounded-full border-4 border-r-white animate-spin" />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm" element={<Confirm />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
