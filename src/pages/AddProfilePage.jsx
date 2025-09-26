import React from 'react';
import Wrapper from '../components/Wrapper';
import AddProfile from '../components/AddProfile';

const AddProfilePage = ({ addProfile }) => {
  return (
    <Wrapper id="add-profile">
      <AddProfile addProfile={addProfile} />
    </Wrapper>
  );
};

export default AddProfilePage;
