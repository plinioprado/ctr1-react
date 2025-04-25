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

  const menu_1 = session
    ? session.menu_options.filter((option) =>
        /^menu_\d+_text$/.test(option.key),
      )
    : [];

  const getMenu2 = (menu_1_key) => {
    const re = new RegExp("^" + menu_1_key.replace("_text", "-\\d_text$"));

    return session.menu_options.filter((option) => re.test(option.key));
  };

  const getOptionValue = (key) =>
    session &&
    session.menu_options.filter((option) => option.key === key)[0].value;

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={ctr_logo} alt="Logo" className="header_logo" />
          </a>
          {session && session.menu_options && (
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
                  {menu_1.map((option1) => {
                    return (
                      <li className="nav-item dropdown" key={option1.key}>
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {getOptionValue(option1.key)}
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          {getMenu2(option1.key).map((option2) => {
                            return (
                              <a
                                className="dropdown-item"
                                href="#"
                                to={getOptionValue(
                                  option2.key.replace("_text", "_path_routing"),
                                )}
                                onClick={handleMenu}
                                key={option2.key}
                              >
                                {getOptionValue(option2.key)}
                              </a>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                  {/* //   <li className="nav-item dropdown">
                //     <a
                //       className="nav-link dropdown-toggle"
                //       href="#"
                //       id="navbarDropdownMenuLink"
                //       role="button"
                //       data-bs-toggle="dropdown"
                //       aria-expanded="false"
                //     >
                //       Admin
                //     </a>
                //     <ul
                //       className="dropdown-menu"
                //       aria-labelledby="navbarDropdownMenuLink"
                //     >
                //       <li>
                //         <a
                //           className="dropdown-item"
                //           href="#"
                //           to="/user"
                //           onClick={handleMenu}
                //         >
                //           Users
                //         </a>
                //       </li>
                //       <li>
                //         <a
                //           className="dropdown-item"
                //           href="#"
                //           to="/setting"
                //           onClick={handleMenu}
                //         >
                //           Settings
                //         </a>
                //       </li>
                //     </ul>
                //   </li> */}
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
