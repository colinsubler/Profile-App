import Header from './components/Header';
import Card from './components/Card';
import imgOne from './assets/woman1.png';
import imgTwo from './assets/man1.png';
import imgThree from './assets/man2.png';
import About from './components/About';

function App() {
    return (
        <>
            <Header />
            <div className="card-row">
              <About />
            </div>
            <div className="card-row">
              <Card
                  imgSrc={imgOne}
                  title="Janet Smith"
                  description="CEO"
              />
              <Card
                  imgSrc={imgTwo}
                  title="Thomas Johnson"
                  description="CFO"
              />
              <Card
                  imgSrc={imgThree}
                  title="Roger Williams"
                  description="COO"
              />
            </div>
            <div className='placeholder'></div>
        </>
    );
}

export default App;