import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Our Company</h1>
          <p>Bringing your creative vision to life with quality print-on-demand products</p>
        </div>
      </div>
      
      <div className="about-section our-story">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, YourPODStore began with a simple mission: to make custom product creation accessible to everyone. 
            Our founders, passionate designers themselves, were frustrated with the high minimum order quantities and lack of quality 
            control in the custom merchandise industry.
          </p>
          <p>
            We set out to create a platform where individuals, small businesses, and organizations could bring their creative visions 
            to life without compromising on quality or breaking the bank. By leveraging print-on-demand technology, we eliminated 
            inventory risks and waste while ensuring each product receives the attention it deserves.
          </p>
          <p>
            Today, we're proud to serve thousands of customers worldwide, helping them express their creativity through 
            high-quality printed products. What started as a small operation has grown into a vibrant community of creators, 
            but our commitment to quality, sustainability, and customer satisfaction remains unchanged.
          </p>
        </div>
        <div className="about-image story-image"></div>
      </div>
      
      <div className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon quality-icon"></div>
            <h3>Quality First</h3>
            <p>We never compromise on the quality of our products or printing processes. Every item is inspected to ensure it meets our high standards.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon sustainability-icon"></div>
            <h3>Sustainability</h3>
            <p>Our print-on-demand model reduces waste by producing only what is ordered. We also prioritize eco-friendly materials and processes.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon creativity-icon"></div>
            <h3>Creativity</h3>
            <p>We believe in empowering creators and helping them bring their unique visions to life without limitations.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon service-icon"></div>
            <h3>Customer Service</h3>
            <p>We're committed to providing exceptional customer support and ensuring your complete satisfaction with every order.</p>
          </div>
        </div>
      </div>
      
      <div className="about-section process">
        <div className="about-image process-image"></div>
        <div className="about-content">
          <h2>Our Process</h2>
          <ol className="process-steps">
            <li>
              <h3>Design Creation</h3>
              <p>Create your design using our online designer or upload your pre-made artwork.</p>
            </li>
            <li>
              <h3>Product Selection</h3>
              <p>Choose from our wide range of high-quality products and customize colors and sizes.</p>
            </li>
            <li>
              <h3>Printing</h3>
              <p>Our expert team prints your design using the latest digital printing technology.</p>
            </li>
            <li>
              <h3>Quality Control</h3>
              <p>Each product undergoes thorough inspection to ensure perfect print quality.</p>
            </li>
            <li>
              <h3>Shipping</h3>
              <p>Your custom products are carefully packaged and shipped directly to your doorstep.</p>
            </li>
          </ol>
        </div>
      </div>
      
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo photo-1"></div>
            <h3>Alex Johnson</h3>
            <p className="member-title">Founder & CEO</p>
            <p className="member-bio">With over 15 years in the printing industry, Alex brings technical expertise and a vision for quality.</p>
          </div>
          
          <div className="team-member">
            <div className="member-photo photo-2"></div>
            <h3>Jamie Smith</h3>
            <p className="member-title">Creative Director</p>
            <p className="member-bio">Jamie's background in graphic design ensures our platform is creator-friendly and intuitive.</p>
          </div>
          
          <div className="team-member">
            <div className="member-photo photo-3"></div>
            <h3>Morgan Lee</h3>
            <p className="member-title">Operations Manager</p>
            <p className="member-bio">Morgan oversees our production processes, ensuring timely delivery and quality standards.</p>
          </div>
          
          <div className="team-member">
            <div className="member-photo photo-4"></div>
            <h3>Taylor Rivera</h3>
            <p className="member-title">Customer Success Lead</p>
            <p className="member-bio">Taylor heads our support team, dedicated to providing exceptional customer experiences.</p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to Create Something Amazing?</h2>
        <p>Join thousands of satisfied customers and bring your creative vision to life today.</p>
        <div className="cta-buttons">
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
          <Link to="/custom" className="btn btn-secondary">Start Designing</Link>
        </div>
      </div>

      <style jsx>{`
        .about-page-container {
          font-family: 'Roboto', sans-serif;
        }
        
        .about-hero {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/images/hero-bg.png');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 100px 20px;
          text-align: center;
          margin-bottom: 40px;
        }
        
        .about-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .about-hero h1 {
          font-size: 3rem;
          margin-bottom: 15px;
        }
        
        .about-hero p {
          font-size: 1.2rem;
          margin: 0;
        }
        
        .about-section {
          display: flex;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
          gap: 40px;
        }
        
        .about-content {
          flex: 1;
        }
        
        .about-content h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }
        
        .about-content p {
          margin-bottom: 15px;
          line-height: 1.6;
          color: #555;
        }
        
        .about-image {
          flex: 1;
          min-height: 400px;
          background-size: cover;
          background-position: center;
          border-radius: 8px;
        }
        
        .story-image {
          background-image: url('../assets/images/about-story.svg');
        }
        
        .process-image {
          background-image: url('../assets/images/about-process.svg');
        }
        
        .values-section {
          padding: 60px 20px;
          text-align: center;
          background-color: #f5f5f5;
          margin-bottom: 60px;
        }
        
        .values-section h2 {
          font-size: 2rem;
          margin-bottom: 40px;
          color: #333;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .value-card {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .value-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .quality-icon {
          background-image: url('../assets/images/quality.png');
        }
        
        .sustainability-icon {
          background-image: url('../assets/images/sustainability.png');
        }
        
        .creativity-icon {
          background-image: url('../assets/images/creativity.png');
        }
        
        .service-icon {
          background-image: url('../assets/images/service.png');
        }
        
        .value-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
        }
        
        .value-card p {
          margin: 0;
          color: #555;
          line-height: 1.5;
        }
        
        .process-steps {
          counter-reset: step-counter;
          list-style-type: none;
          padding: 0;
        }
        
        .process-steps li {
          counter-increment: step-counter;
          position: relative;
          padding-left: 50px;
          margin-bottom: 30px;
        }
        
        .process-steps li::before {
          content: counter(step-counter);
          position: absolute;
          left: 0;
          top: 0;
          background-color: #4a90e2;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .process-steps h3 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #333;
        }
        
        .process-steps p {
          margin: 0;
          color: #555;
        }
        
        .team-section {
          padding: 60px 20px;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto 60px;
        }
        
        .team-section h2 {
          font-size: 2rem;
          margin-bottom: 40px;
          color: #333;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 30px;
        }
        
        .team-member {
          text-align: center;
        }
        
        .member-photo {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background-size: cover;
          background-position: center;
        }
        
        .photo-1 {
          background-image: url('../assets/images/alex.png');
        }
        
        .photo-2 {
          background-image: url('../assets/images/jamie.png');
        }
        
        .photo-3 {
          background-image: url('../assets/images/morgan.png');
        }
        
        .photo-4 {
          background-image: url('../assets/images/taylor.png');
        }
        
        .team-member h3 {
          margin: 0 0 5px 0;
          color: #333;
        }
        
        .member-title {
          color: #4a90e2;
          font-weight: 600;
          margin: 0 0 10px 0;
        }
        
        .member-bio {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }
        
        .cta-section {
          background-color: #4a90e2;
          color: white;
          text-align: center;
          padding: 60px 20px;
        }
        
        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 15px;
        }
        
        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 25px;
          border-radius: 4px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .btn-primary {
          background-color: white;
          color: #4a90e2;
        }
        
        .btn-primary:hover {
          background-color: #f0f0f0;
        }
        
        .btn-secondary {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2.5rem;
          }
          
          .about-section {
            flex-direction: column;
          }
          
          .about-section.process {
            flex-direction: column-reverse;
          }
          
          .about-image {
            width: 100%;
            margin-bottom: 30px;
          }
          
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .about-hero h1 {
            font-size: 2rem;
          }
          
          .process-steps li {
            padding-left: 40px;
          }
          
          .process-steps li::before {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;