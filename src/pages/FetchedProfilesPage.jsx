import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import FetchedProfiles from '../components/FetchedProfiles';
import Filters from '../components/Filters';
import Card from '../components/Card';

const FetchedProfilesPage = ({ profiles, setProfiles }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All Titles');

  const handleDataFetched = (newProfiles) => {
    setProfiles(prev => [...newProfiles, ...prev]);
  };

  const allTitles = Array.from(new Set(profiles.map(profile => profile.title)));

  const handleTitleChange = (event) => setSelectedTitle(event.target.value);
  const handleSearchChange = (event) => setSearchName(event.target.value);
  const handleClear = () => {
    setSelectedTitle('All Titles');
    setSearchName('');
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesTitle = selectedTitle === 'All Titles' || profile.title === selectedTitle;
    const matchesName = profile.name.toLowerCase().includes(searchName.toLowerCase());
    return matchesTitle && matchesName;
  });

  return (
    <>
      {/* Fetch profiles by title from API */}
      <Wrapper id="fetched-profiles">
        <FetchedProfiles onDataFetched={handleDataFetched} />
      </Wrapper>

      {/* Filters */}
      <Wrapper id="filters">
        <Filters
          titles={allTitles}
          selectedValue={selectedTitle}
          onDescriptionChange={handleTitleChange}
          searchValue={searchName}
          onSearchChange={handleSearchChange}
          onClear={handleClear}
        />
      </Wrapper>

      {/* Cards */}
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

export default FetchedProfilesPage;
