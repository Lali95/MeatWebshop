import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch(`/api/Auth/GetUserByEmail/${email}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          console.error(
            "Failed to fetch user information:",
            response.statusText
          );
          return;
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error during user information retrieval:", error);
      }
      await fetchUserInfo();
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <p>Loading...</p>;
  };

  

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="profile-container">
      <p>Welcome, {userInfo.userName}</p>
   
      <p></p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Profile;
