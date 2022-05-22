import React, { useState } from "react";
import { getUserProfile } from "../../scripts/spotify-api.js";
import "../../style/user-profile.css";

function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  if (
    userProfile &&
    Object.keys(userProfile).length === 0 &&
    Object.getPrototypeOf(userProfile) === Object.prototype
  ) {
    console.log("profile");
    getUserProfile(setUserProfile);
    return <div>loading...</div>;
  } else {
    const url = userProfile.images[0].url;
    console.log("filter", userProfile.explicit_content.filter_enabled);
    return (
      <div>
        <div className="profile-header">
          <div>
            <img
              className="profile-picture"
              src={url}
              alt={userProfile.display_name}
            />
          </div>
          <div>
            <h1>{userProfile.display_name}</h1>
          </div>
        </div>
        <div className="profile-data">
          <table className="profile-table">
            <tbody>
              <tr>
                <td className="label">Country</td>
                <td>{userProfile.country}</td>
              </tr>
              <tr>
                <td className="label">Email</td>
                <td>{userProfile.email}</td>
              </tr>
              <tr>
                <td className="label">Explicit Content Filter Enabled</td>
                <td>
                  {userProfile.explicit_content.filter_enabled
                    ? "True"
                    : "False"}
                </td>
              </tr>
              <tr>
                <td className="label">Explicit Content Filter Locked</td>
                <td>
                  {userProfile.explicit_content.filter_locked
                    ? "True"
                    : "False"}
                </td>
              </tr>
              <tr>
                <td className="label">External Profile Link</td>
                <td>{userProfile.external_urls.spotify}</td>
              </tr>
              <tr>
                <td className="label">Followers</td>
                <td>{userProfile.followers.total}</td>
              </tr>
              <tr>
                <td className="label">Api Profile Link</td>
                <td>{userProfile.href}</td>
              </tr>
              <tr>
                <td className="label">Profile ID</td>
                <td>{userProfile.id}</td>
              </tr>
              <tr>
                <td className="label">Profile Image Url</td>
                <td>{url}</td>
              </tr>
              <tr>
                <td className="label">Account Product</td>
                <td>{userProfile.product}</td>
              </tr>
              <tr>
                <td className="label">Account Type</td>
                <td>{userProfile.type}</td>
              </tr>
              <tr>
                <td className="label">Account URI</td>
                <td>{userProfile.uri}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserProfile;
