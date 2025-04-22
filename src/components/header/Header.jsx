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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={ctr_logo} alt="Logo" className="header_logo" />
          </a>
          {session && (
            <>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      to="/"
                      onClick={handleMenu}
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          to="/setting"
                          onClick={handleMenu}
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item ms-auto">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      to="/login"
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
