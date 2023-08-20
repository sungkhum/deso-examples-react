import { identity } from "deso-protocol";
import { useContext } from "react";
import { DeSoIdentityContext } from "react-deso-protocol";
import { Link } from "react-router-dom";
import { getDisplayName } from "../helpers";

export const Nav = () => {
  const { currentUser, alternateUsers, isLoading } = useContext(DeSoIdentityContext);

  const getProfilePictureUrl = (user) => {
    return `https://diamondapp.com/api/v0/get-single-profile-picture/${user.PublicKeyBase58Check}?fallback=https://bitclout.com/assets/img/default_profile_pic.png`;
  };

  return (
    <nav className="main-nav">
      <Link to="/">Home</Link>
      <Link to="/">
      <Link to="/sign-and-submit-tx">Sign and Submit Transaction</Link>
        <img src={logo} alt="Home Logo" className="App-logo" />
      <Link to="switch-account">Switch Accounts</Link>
      <div className="main-nav__user-actions">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!!currentUser && (
              <div className="group relative pb-1">
                <div className="flex items-center cursor-pointer pb-1">
                  <img 
                    src={getProfilePictureUrl(currentUser)} 
                    alt="Current User Profile" 
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="main-nav__username mr-2">
                    {getDisplayName(currentUser)}
                  </span>
                </div>
                <div className="absolute left-0 w-48 bg-gray-800 border border-gray-700 divide-y divide-gray-600 rounded-md shadow-lg z-50 group-hover:block hidden">
                  {alternateUsers?.map((user) => (
                    <div
                      key={user.PublicKeyBase58Check}
                      className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                      onClick={() => identity.setActiveUser(user.PublicKeyBase58Check)}
                    >
                      <img 
                        src={getProfilePictureUrl(user)} 
                        alt="Alternate User Profile" 
                        className="w-8 h-8 rounded-full mr-2 inline-block"
                      />
                      {getDisplayName(user)}
                    </div>
                  ))}
                  <div className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700" onClick={() => identity.login()}>
                    Add another account
                  </div>
                  <div className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700" onClick={() => identity.logout()}>
                    Logout
                  </div>
                </div>
              </div>
            )}

            {!currentUser && (
              <button onClick={() => identity.login()}>Login</button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};
