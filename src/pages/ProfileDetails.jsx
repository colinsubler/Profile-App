import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import styles from "../styles/profiledetails.module.css";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <Wrapper><p>Loading profile...</p></Wrapper>;
  if (error) return <Wrapper><p>{error}</p></Wrapper>;
  if (!profile) return <Wrapper><p>Profile not found.</p></Wrapper>;

  return (
    <Wrapper id="profile-details">
      <div className={styles.container}>
        <img
          src={profile.imgSrc || profile.image_url}
          alt={profile.name}
          className={styles.profileImage}
        />
        <h1 className={styles.name}>{profile.name}</h1>
        <h2 className={styles.title}>{profile.title}</h2>
        <p className={styles.email}><strong>Email:</strong> {profile.email}</p>
        <p className={styles.bio}>{profile.bio}</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      </div>
    </Wrapper>
  );
};

export default ProfileDetails;
