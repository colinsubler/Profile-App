import React from 'react';
import aboutImg from '../assets/campus.png';

const About = () => (
    <div className="about-section" style={{ textAlign: 'center' }}>
        <img src={aboutImg} alt="About" style={{ maxWidth: '850px', borderRadius: '8px', display: 'block', margin: '0 auto' }} />
        <h1>About Us</h1>
        <div style={{ textAlign: 'left', maxWidth: '850px', margin: '0 auto' }}>
            <p>
                Internet Corp. was founded in 2010 with a vision to revolutionize the way people connect, communicate, and collaborate online. What began as a small startup in a single-room office has grown into a leading provider of innovative web solutions, serving clients across the globe. Our journey has been fueled by a passion for technology and a commitment to making the internet a better place for everyone.
            </p>
            <br />
            <p>
                Over the years, Internet Corp. has expanded its services to include web development, cloud infrastructure, cybersecurity, and digital marketing. Our talented team of engineers, designers, and strategists work tirelessly to deliver cutting-edge products that empower businesses and individuals to thrive in the digital age. We believe in fostering a culture of creativity, integrity, and continuous learning.
            </p>
            <br />
            <p>
                At the heart of Internet Corp. are our dedicated leaders. Janet Smith, our CEO, brings over two decades of experience in technology and business management, guiding the company with vision and determination. Thomas Johnson, our CFO, ensures our financial stability and growth, while Roger Williams, our COO, oversees daily operations and drives our commitment to excellence.
            </p>
            <br />
            <p>
                Today, Internet Corp. stands as a testament to what can be achieved through innovation, teamwork, and a relentless pursuit of excellence. We are proud of our history and excited for the future as we continue to shape the digital landscape and help our clients succeed.
            </p>
        </div>
    </div>
);

export default About;