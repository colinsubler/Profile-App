import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import imgOne from './assets/woman1.png';
import imgTwo from './assets/man1.png';
import imgThree from './assets/man2.png';
import About from './components/About';
import Wrapper from './components/Wrapper';
import Filters from './components/Filters';

const initialProfiles = [
    {
        imgSrc: imgOne,
        title: "Janet Smith",
        description: "CEO"
    },
    {
        imgSrc: imgTwo,
        title: "Thomas Johnson",
        description: "CFO"
    },
    {
        imgSrc: imgThree,
        title: "Roger Williams",
        description: "COO"
    },
    {
        imgSrc: imgOne,
        title: "Emily Carter",
        description: "Project Manager"
    },
    {
        imgSrc: imgTwo,
        title: "Michael Brown",
        description: "Project Manager"
    },
    {
        imgSrc: imgOne,
        title: "Sophia Lee",
        description: "Junior Engineer"
    },
    {
        imgSrc: imgThree,
        title: "David Kim",
        description: "Junior Engineer"
    },
    {
        imgSrc: imgTwo,
        title: "James Wilson",
        description: "Junior Engineer"
    },
    {
        imgSrc: imgOne,
        title: "Olivia Martinez",
        description: "Junior Engineer"
    },
    {
        imgSrc: imgOne,
        title: "Ava Thompson",
        description: "HR Director"
    },
    {
        imgSrc: imgThree,
        title: "William Anderson",
        description: "Senior Engineer"
    },
    {
        imgSrc: imgTwo,
        title: "Benjamin Clark",
        description: "Senior Engineer"
    },
    {
        imgSrc: imgThree,
        title: "Matthew Scott",
        description: "Senior Engineer"
    }
];

function App() {
    const [profiles, setProfiles] = useState(initialProfiles);
    const descriptions = Array.from(new Set(profiles.map(profile => profile.description)));
    const [selectedDescription, setSelectedDescription] = useState('all');
    const [searchName, setSearchName] = useState('');

    const addProfiles = (profile) => {
        setProfiles(prev => [...prev, profile]);
    }

    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleClear = () => {
        setSelectedDescription('all');
        setSearchName('');
    };

    const filteredProfiles = profiles.filter(profile => {
        const matchesDescription = selectedDescription === 'all' || profile.description === selectedDescription;
        const matchesName = profile.title.toLowerCase().includes(searchName.toLowerCase());
        return matchesDescription && matchesName;
    });

    return (
        <>
            <Header />
            <Wrapper id="about">
                <div className="content-row">
                    <About />
                </div>
            </Wrapper>
            <Wrapper id="add-profile">
                <AddProfile AddProfiles={profiles}/>
            </Wrapper>
            <Wrapper id="cards">
                <div className="card-row">
                    <Filters
                        titles={descriptions}
                        selectedValue={selectedDescription}
                        onDescriptionChange={handleDescriptionChange}
                        searchValue={searchName}
                        onSearchChange={handleSearchChange}
                        onClear={handleClear}
                    />
                </div>
                <div className="card-row" id="profiles">
                    {filteredProfiles.map((profile, index) => (
                        <Card
                            key={index}
                            imgSrc={profile.imgSrc}
                            title={profile.title}
                            description={profile.description}
                        />
                    ))}
                </div>
                <div className='placeholder'></div>
            </Wrapper>
        </>
    );
}

export default App;