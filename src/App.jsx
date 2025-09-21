import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import imgOne from './assets/woman1.png';
import imgTwo from './assets/man1.png';
import imgThree from './assets/man2.png';
import About from './components/About';
import Wrapper from './components/Wrapper';
import Filters from './components/Filters';
import AddProfile from './components/AddProfile';
import FetchedProfiles from './components/FetchedProfiles';

const initialProfiles = [
    {
        imgSrc: imgOne,
        name: "Janet Smith",
        title: "CEO",
        email: "janet.s@example.com",
        bio: "An accomplished leader with over two decades of experience in strategic planning, business development, and operational excellence. Janet has a proven track record of driving significant revenue growth and fostering a culture of innovation."
    },
    {
        imgSrc: imgTwo,
        name: "Thomas Johnson",
        title: "CFO",
        email: "thomas.j@example.com",
        bio: "A highly analytical and results-driven CFO with a strong background in financial forecasting, risk management, and capital planning. Thomas specializes in creating robust financial strategies that support long-term business objectives and profitability."
    },
    {
        imgSrc: imgThree,
        name: "Roger Williams",
        title: "COO",
        email: "roger.w@example.com",
        bio: "A strategic and forward-thinking COO with a focus on streamlining operations, improving efficiency, and leading cross-functional teams. Roger excels at implementing scalable processes that enhance productivity and customer satisfaction."
    },
    {
        imgSrc: imgOne,
        name: "Emily Carter",
        title: "Project Manager",
        email: "emily.c@example.com",
        bio: "A certified Project Manager known for delivering complex projects on time and within budget. Emily has a strong ability to coordinate resources, manage stakeholders, and mitigate risks to ensure project success from initiation to completion."
    },
    {
        imgSrc: imgTwo,
        name: "Michael Brown",
        title: "Project Manager",
        email: "michael.b@example.com",
        bio: "Michael is an experienced Project Manager skilled in Agile and Scrum methodologies. He has a passion for leading collaborative teams and is adept at breaking down complex tasks into manageable milestones to achieve project goals."
    },
    {
        imgSrc: imgOne,
        name: "Sophia Lee",
        title: "Junior Engineer",
        email: "sophia.l@example.com",
        bio: "A motivated Junior Engineer with a foundational knowledge of software development and a keen interest in problem-solving. Sophia is a fast learner dedicated to contributing to innovative projects and expanding her technical skill set."
    },
    {
        imgSrc: imgThree,
        name: "David Kim",
        title: "Junior Engineer",
        email: "david.k@example.com",
        bio: "David is an enthusiastic Junior Engineer specializing in web development. He is passionate about building clean, efficient code and is eager to learn from senior mentors to grow his career in the engineering field."
    },
    {
        imgSrc: imgTwo,
        name: "James Wilson",
        title: "Junior Engineer",
        email: "james.w@example.com",
        bio: "A dedicated Junior Engineer with hands-on experience in data analysis and system optimization. James is detail-oriented and committed to applying his skills to help the team improve system performance and reliability."
    },
    {
        imgSrc: imgOne,
        name: "Olivia Martinez",
        title: "Junior Engineer",
        email: "olivia.m@example.com",
        bio: "Olivia is a proactive Junior Engineer with a background in network infrastructure. She is committed to supporting her team by providing technical assistance and is always seeking new challenges to enhance her engineering abilities."
    },
    {
        imgSrc: imgOne,
        name: "Ava Thompson",
        title: "HR Director",
        email: "ava.t@example.com",
        bio: "A compassionate and strategic HR Director with extensive experience in talent acquisition, employee relations, and organizational development. Ava is committed to fostering a positive and inclusive work environment that supports company growth and employee well-being."
    },
    {
        imgSrc: imgThree,
        name: "William Anderson",
        title: "Senior Engineer",
        email: "william.a@example.com",
        bio: "A seasoned Senior Engineer with a decade of experience in developing large-scale software solutions. William is a proven leader and mentor, skilled in designing scalable architectures and driving technical innovation."
    },
    {
        imgSrc: imgTwo,
        name: "Benjamin Clark",
        title: "Senior Engineer",
        email: "benjamin.c@example.com",
        bio: "Benjamin is a highly skilled Senior Engineer specializing in cloud computing and DevOps. He has a track record of automating workflows and implementing CI/CD pipelines to significantly improve development efficiency."
    },
    {
        imgSrc: imgThree,
        name: "Matthew Scott",
        title: "Senior Engineer",
        email: "matthew.s@example.com",
        bio: "An accomplished Senior Engineer with expertise in cybersecurity and systems architecture. Matthew is adept at leading technical teams to build secure, resilient, and high-performance systems."
    }
];

function App() {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [fetchedProfiles, setFetchedProfiles] = useState([]);
    const [searchName, setSearchName] = useState('');

    // Combine all profiles into a single list, with fetched profiles at the beginning
    const allProfiles = [...fetchedProfiles, ...profiles];

    const allTitles = Array.from(new Set(allProfiles.map(profile => profile.title)));

    const [selectedTitle, setSelectedTitle] = useState('All Titles');

    const addProfiles = (profile) => {
        setProfiles(prev => [...prev, profile]);
    }

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleClear = () => {
        setSelectedTitle('All Titles');
        setSearchName('');
    };

    const filteredProfiles = allProfiles.filter(profile => {
        const matchesTitle = selectedTitle === 'All Titles' || profile.title === selectedTitle;
        const matchesName = profile.name.toLowerCase().includes(searchName.toLowerCase());
        return matchesTitle && matchesName;
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
                <AddProfile addProfiles={addProfiles}/>
            </Wrapper>
            <Wrapper id="fetched-profiles">
                <FetchedProfiles onDataFetched={setFetchedProfiles} />
            </Wrapper>
            <Wrapper id="cards">
                <div className="card-row">
                    <Filters
                        titles={allTitles}
                        selectedValue={selectedTitle}
                        onDescriptionChange={handleTitleChange}
                        searchValue={searchName}
                        onSearchChange={handleSearchChange}
                        onClear={handleClear}
                    />
                </div>
                <div className="card-row" id="profiles">
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
                <div className='placeholder'></div>
            </Wrapper>
        </>
    );
}

export default App;