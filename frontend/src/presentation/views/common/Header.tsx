import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Person from '@mui/icons-material/Person';

import { useSingOut } from '@/queries/hooks/auth/useAuthMutation';

import { useMessageContext } from '@/presentation/contexts/messageContext';
import { useAuthContex } from '@/presentation/contexts/authContext';
import { SEVERITY } from '@/domain/types/constants/severity';

type Props = {
  loading: boolean;
  isSignedIn: boolean;
  handleSignOut: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const HeaderNavigation = (props: Props) => {
  if (props.loading) return null;

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="flex min-h-16 items-center px-4">
        {props.isSignedIn ? (
          <>
            {/* 左側（メニュー） */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="メニューを開く"
                className="rounded-full p-2 transition hover:bg-blue-500"
              >
                <Person />
              </button>
              <RouterLink
                to="/"
                className="text-xl font-semibold text-white no-underline hover:opacity-90"
              >
                {/* {toConvertTodoStatus(props.todoFilter)} */}
              </RouterLink>
            </div>
            {/* 右側（ログアウト・パスワード変更） */}
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={props.handleSignOut}
                className="rounded-md px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                ログアウト
              </button>
              <RouterLink
                to="/passwordchange"
                className="rounded-md px-3 py-2 text-sm font-medium text-white no-underline transition hover:bg-blue-500"
              >
                パスワード変更
              </RouterLink>
            </div>
          </>
        ) : (
          <div className="ml-auto flex items-center gap-1">
            <RouterLink
              to="/signin"
              className="rounded-md px-3 py-2 text-sm font-medium text-white no-underline transition hover:bg-blue-500"
            >
              ログイン
            </RouterLink>
            <RouterLink
              to="/signup"
              className="rounded-md px-3 py-2 text-sm font-medium text-white no-underline transition hover:bg-blue-500"
            >
              アカウント新規登録
            </RouterLink>
          </div>
        )}
      </div>
    </header>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const singOut = useSingOut();
  const { isAuthenticated, isLoading } = useAuthContex();
  const { showMessage } = useMessageContext();

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      singOut.mutate();
      showMessage('サインアウトしました', SEVERITY.SUCCESS);
      navigate('/signin');
    } catch (err) {
      showMessage('サインアウトに失敗しました', SEVERITY.ERROR);
      throw err;
    }
  };

  return (
    <>
      <HeaderNavigation
        loading={isLoading}
        isSignedIn={isAuthenticated}
        handleSignOut={handleSignOut}
      />
    </>
  );
};
export default Header;
