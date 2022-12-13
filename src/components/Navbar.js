import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
const { logOutUser, user } = useContext(AuthContext);


  return (
    <nav id='flexcontainer' className='Navbar'>
      {user ? <><h1>Welcome  {user.name}!</h1>
      <button className='push' onClick={logOutUser}>Logout</button></> : <>
      <h1>Welcome, log in to see your page!</h1></>}
    </nav>
  );
}
 
export default Navbar;