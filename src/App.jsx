import Header from './components/Header';
import Card from './components/Card';
import imgOne from './assets/woman1.png';
import imgTwo from './assets/man1.png';
import imgThree from './assets/man2.png';
import About from './components/About';
import Wrapper from './components/Wrapper';

const profiles = [
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
    }
];

function App() {
    return (
        <>
            <Header />
            <Wrapper>
                <div className="card-row">
                    <About />
                </div>
                <div className="card-row" id="profiles">
                    {profiles.map((profile, index) => (
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