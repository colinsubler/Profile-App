import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import FetchedProfiles from '../components/FetchedProfiles';
import Card from '../components/Card';

const FetchedProfilesPage = () => {
  const [fetchedProfiles, setFetchedProfiles] = useState([]);
  const navigate = useNavigate();

  const handleDataFetched = (newProfiles) => {
    const profilesWithId = newProfiles.map((p, index) => ({
      ...p,
      id: p.id || Date.now() + index,
    }));
    setFetchedProfiles(prev => [...profilesWithId, ...prev]);
  };

  const handleCardClick = (profile) => {
    if (profile.id) {
      navigate(`/fetched-profiles/${profile.id}`);
    }
  };

  return (
    <>
      <Wrapper id="fetched-profiles">
        <FetchedProfiles onDataFetched={handleDataFetched} />
      </Wrapper>

      <Wrapper id="cards">
        <div className="card-row">
          {fetchedProfiles.length > 0 ? (
            fetchedProfiles.map((profile, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(profile)}
                style={{ cursor: "pointer" }}
              >
                <Card
                  imgSrc={profile.imgSrc || profile.image_url}
                  name={profile.name}
                  title={profile.title}
                  email={profile.email}
                  bio={profile.bio}
                />
              </div>
            ))
          ) : (
            <div>No fetched profiles yet.</div>
          )}
        </div>
      </Wrapper>
    </>
  );
};


export default FetchedProfilesPage;
