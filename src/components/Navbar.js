import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
const { logOutUser, user } = useContext(AuthContext);


  return (
    <nav className='Navbar'>
      <button onClick={logOutUser}>Logout</button>
    </nav>
  );
}
 
export default Navbar;