import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import ctr_logo from "../../assets/ctr_logo.svg";

function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const handleMenu = (e) => {
    navigate(e.target.getAttribute("to"));
    e.preventDefault();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={ctr_logo} alt="Logo" className="header_logo" />
          </a>
          {session && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      to="/home"
                      onClick={handleMenu}
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          to="/user"
                          onClick={handleMenu}
                        >
                          Users
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          to="/setting"
                          onClick={handleMenu}
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item ms-auto">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      to="/"
                      onClick={handleMenu}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
