import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css"; // Ensure this path is correct

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [uploadBalance, setUploadBalance] = useState(false);
  const [amount, setAmount] = useState("");
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
          console.error("Failed to fetch user information:", response.statusText);
          return;
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error during user information retrieval:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBalanceClick = () => {
    setUploadBalance(!uploadBalance);
  };

  const handleBalanceUpdate = async (e) => {
    e.preventDefault();

    try {
      const balanceResponse = await fetch("/api/Auth/UpBalance", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          balance: parseFloat(amount),
        }),
      });

      if (!balanceResponse.ok) {
        console.error(`Failed to update balance. Status: ${balanceResponse.status}`);
        return;
      }

      // Fetch updated user info
      const updatedResponse = await fetch(`/api/Auth/GetUserByEmail/${userInfo.email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!updatedResponse.ok) {
        console.error("Failed to fetch updated user information:", updatedResponse.statusText);
        return;
      }

      const updatedData = await updatedResponse.json();
      setUserInfo(updatedData);

      // Clear the input and hide the form
      setAmount("");
      setUploadBalance(false);
    } catch (error) {
      console.error("Error during balance update:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!userInfo) {
    return <p>Loading...</p>;
  };

  return (
    <div className="profile-container">
      <p className="profile-welcome">Welcome, {userInfo.userName}</p>
      <p className="profile-balance">Balance: ${userInfo.balance.toFixed(2)}</p>
      <button className="profile-button" onClick={handleBalanceClick}>
        {uploadBalance ? "Cancel" : "Upload balance"}
      </button>
      {uploadBalance && (
        <div className="balance-form-container">
          <h2>Upload balance</h2>
          <form onSubmit={handleBalanceUpdate}>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="profile-input"
              />
            </label>
            <button type="submit" className="profile-button">
              Upload
            </button>
          </form>
        </div>
      )}
      <p className="profile-empty-paragraph"></p>
      <button className="profile-button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
