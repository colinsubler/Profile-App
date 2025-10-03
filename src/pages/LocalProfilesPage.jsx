import React, { useState, useContext, useLayoutEffect } from 'react';
import Wrapper from '../components/Wrapper';
import Filters from '../components/Filters';
import Card from '../components/Card';
import ProfilesContext from '../components/ProfilesContext';

const LocalProfilesPage = () => {
  const { profiles } = useContext(ProfilesContext);
  const [searchName, setSearchName] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTitles = Array.from(new Set(profiles.map(profile => profile.title)));

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setSelectedTitle(value === 'all' ? 'All' : value);
    if (value === 'all') setSearchName('');
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesTitle = selectedTitle === 'All' || profile.title === selectedTitle;
    const matchesName = profile.name.toLowerCase().includes(searchName.toLowerCase());
    return matchesTitle && matchesName;
  });

  return (
    <>
      <Wrapper id="filters">
        <Filters
          titles={allTitles}
          selectedValue={selectedTitle}
          onDescriptionChange={handleTitleChange}
          searchValue={searchName}
          onSearchChange={(e) => setSearchName(e.target.value)}
          onClear={() => {
            setSelectedTitle('All');
            setSearchName('');
          }}
        />
      </Wrapper>

      <Wrapper id="cards">
        <div className="card-row">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <Card
                key={index}
                imgSrc={profile.imgSrc || profile.image_url}
                name={profile.name}
                title={profile.title}
                email={profile.email}
                bio={profile.bio}
              />
            ))
          ) : (
            <div>No profiles found.</div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default LocalProfilesPage;
