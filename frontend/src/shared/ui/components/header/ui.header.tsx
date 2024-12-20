import { Link, NavLink } from 'react-router';
import { useThemeContext } from '../../../../contexts/theme.context';
import { useAuthContext } from '../../../../contexts/auth.context';

export function Header() {
  const { theme, changeTheme } = useThemeContext();
  const { logout } = useAuthContext();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={'/'}>
          transcribe.it
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <div className="flex w-full flex-col border-opacity-50">
              <li>
                <NavLink className="justify-between" to={'/profile'}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={'/settings'}>
                  Settings
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={'/logout'} onClick={() => logout()}>
                  Logout
                </NavLink>
              </li>
              <div className="divider"></div>
              <li>
                <label className="flex cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    onClick={changeTheme}
                    value={theme === 'light' ? 'business' : 'light'}
                    checked={theme === 'business'}
                    onChange={() => {}}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
