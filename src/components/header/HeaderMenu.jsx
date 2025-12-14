import { useRef } from "react";

function HeaderMenu({ handleMenu, menuOptions }) {
  const getPath = (key) => {
    const option = menuOptions.find(
      (op) => op.key === key.replace("_text", "_path_routing"),
    );
    return option === undefined ? undefined : option.value;
  };

  const MenuLevel1 = menuOptions
    .filter((option) => /^menu_\d+_text$/.test(option.key))
    .map((option) => ({
      text: option.value,
      path: getPath(option.key),
      key: option.key.substring(5, 6),
    }));

  const getMenuLevel2 = (key1) =>
    menuOptions
      .filter((option) =>
        new RegExp(`^menu_${key1}-\\d_text$`).test(option.key),
      )
      .map((option) => ({
        text: option.value,
        path: getPath(option.key),
        key: option.key.substring(7, 8),
      }));

  const getMenuLevel3 = (key1, key2) =>
    menuOptions
      .filter((option) =>
        new RegExp(`^menu_${key1}-${key2}-\\d_text$`).test(option.key),
      )
      .map((option) => ({
        text: option.value,
        path: getPath(option.key),
        key: option.key.substring(9, 10),
      }));

  return (
    <>
      <MenuItem handleMenu={handleMenu} path="/home" text="Home" />
      {MenuLevel1.map((option1) =>
        option1.path === undefined ? (
          <MenuDropDown1
            option1={option1}
            getMenuLevel2={getMenuLevel2}
            getMenuLevel3={getMenuLevel3}
            handleMenu={handleMenu}
            key={option1.key}
          />
        ) : (
          <MenuItem
            handleMenu={handleMenu}
            path={option1.path}
            text={option1.text}
            key={option1.key}
          />
        ),
      )}
    </>
  );
}

function MenuItem({ handleMenu, path, text }) {
  return (
    <li className="nav-item">
      <a
        className="nav-link"
        aria-current="page"
        href="#"
        to={path}
        onClick={handleMenu}
      >
        {text}
      </a>
    </li>
  );
}

function MenuDropDown1({ option1, getMenuLevel2, getMenuLevel3, handleMenu }) {
  const menuLevel2 = getMenuLevel2(option1.key);
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        key={option1.key}
      >
        {option1.text}
      </a>
      <ul className="dropdown-menu">
        {menuLevel2.map((option2) =>
          option2.path === undefined ? (
            <MenuDropdown2
              option1={option1}
              option2={option2}
              getMenuLevel3={getMenuLevel3}
              handleMenu={handleMenu}
              key={option2.key}
            />
          ) : (
            <MenuItem
              handleMenu={handleMenu}
              path={option2.path}
              text={option2.text}
              key={option2.key}
            />
          ),
        )}
      </ul>
    </li>
  );
}

function MenuDropdown2({ option1, option2, getMenuLevel3, handleMenu }) {
  const submenuRef = useRef(null);
  const menuLevel3 = getMenuLevel3(option1.key, option2.key);

  return (
    <li
      className="nav-item dropdown-submenu position-relative"
      onClick={() => {
        const submenu = submenuRef.current;
        if (submenu) submenu.classList.add("show");
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          const submenu = submenuRef.current;
          if (submenu) submenu.classList.remove("show");
        }
      }}
    >
      <a
        className="dropdown-item dropdown-toggle "
        href="#"
        data-bs-auto-close="outside"
      >
        {option2.text}
      </a>
      <ul
        className="dropdown-menu"
        ref={submenuRef}
        style={{
          top: 0,
          left: "100%",
          marginLeft: "-0.2rem",
          borderRadius: "0.5rem",
          minWidth: "10rem",
          boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
        }}
      >
        {menuLevel3.map((option3) => (
          <MenuItem
            handleMenu={handleMenu}
            path={option3.path}
            text={option3.text}
            key={option3.key}
          />
        ))}
      </ul>
    </li>
  );
}

export default HeaderMenu;
