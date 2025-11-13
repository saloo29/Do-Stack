const NavBar = ({ user }) => {
 /*  const handleLogout = () => {
    headers: {Authorization: `Bearer ${localStorage.removeItem('token')}`}
  }; */
  const handleLogout = () => {
    localStorage.removeItem("token-info");
  }
  

  function capitalize(str){
    if(!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return(
    <div className="nav-bar">
      <div>
        <h2>DoStack</h2>
      </div> 
       <div className="nav-items">
        <h4 className="welcome-greet">Welcome! {capitalize(user.username)}</h4>
        <button className='app-button' 
          onClick={handleLogout}
        >Logout</button>
      </div>
    </div>
  )
}

export default NavBar;