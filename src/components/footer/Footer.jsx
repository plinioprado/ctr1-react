import { useContext } from "react";
import { SessionContext } from "../../SessionContext";

function Footer() {
  const { session } = useContext(SessionContext);

  return (
    <footer>
      <div className="container">
        <span>&copy; Plinio Prado. All rights reserved.</span>
        <span>{session && session.user && session.user.name}</span>
        <span>{session && session.entity && session.entity.name}</span>
      </div>
    </footer>
  );
}

export default Footer;
