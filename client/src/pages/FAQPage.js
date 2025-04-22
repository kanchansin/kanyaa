import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "How does print-on-demand work?",
      answer: "Print-on-demand is a business model where products are printed only after an order is placed. When you purchase from us, we create your custom product on demand, which means there's no waste or excess inventory. Your order is then shipped directly to you from our production facility."
    },
    {
      question: "What is the quality of your products?",
      answer: "We use high-quality materials and modern printing techniques to ensure durable, long-lasting products. Our t-shirts are made from premium cotton, our mugs are dishwasher and microwave safe, and all of our products undergo quality control before shipping."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and the product ordered. Typically, domestic orders take 3-5 business days for production plus 2-5 business days for shipping. International orders may take 7-14 business days for shipping after production. You'll receive tracking information once your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for products that are defective or damaged during shipping. Since our products are custom-made, we cannot accept returns for other reasons. Please contact our customer service team with photos of any damaged items for assistance with returns or replacements."
    },
    {
      question: "Can I cancel my order?",
      answer: "You can cancel your order within 2 hours of placing it. After this window, your order enters production and cannot be canceled. Please contact our customer service team immediately if you need to cancel an order."
    },
    {
      question: "What file types do you accept for custom designs?",
      answer: "We accept most common image file types including JPG, PNG, PDF, and SVG. For best results, we recommend high-resolution images (at least 300 DPI). If you're unsure about your file, you can use our online designer tool to preview how it will look on your chosen product."
    },
    {
      question: "Can I order in bulk for my business or event?",
      answer: "Yes! We offer bulk pricing for larger orders. Please contact our sales team for a custom quote and to discuss your specific requirements. We can also create a dedicated storefront for your business or event."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can also log into your account on our website to view your order status and tracking details at any time."
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer: "Your satisfaction is our priority. If you're not happy with your order for any reason, please contact our customer service team within 7 days of receiving your product. We'll work with you to resolve any issues and ensure you're completely satisfied."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees, duties, and taxes may apply for international orders and are the responsibility of the recipient."
    },
    {
      question: "Can I edit my design after ordering?",
      answer: "Once an order is placed, it quickly enters our production queue and cannot be edited. We recommend carefully reviewing your design in our preview tool before completing your purchase to ensure everything is perfect."
    },
    {
      question: "How do I care for my printed products?",
      answer: "For clothing items, we recommend washing inside-out in cold water and tumble drying on low heat or air drying. For mugs and accessories, follow the care instructions included with your product. Proper care will help maintain the quality and longevity of your printed designs."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for answers..." 
          className="faq-search" 
        />
      </div>
      
      <div className="faq-categories">
        <button className="category-btn active">All</button>
        <button className="category-btn">Ordering</button>
        <button className="category-btn">Shipping</button>
        <button className="category-btn">Returns</button>
        <button className="category-btn">Product Info</button>
      </div>
      
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div className="faq-item" key={index}>
            <div 
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <h3>{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="contact-section">
        <h2>Still have questions?</h2>
        <p>Our customer support team is here to help you with any questions or concerns.</p>
        <div className="contact-options">
          <div className="contact-option">
            <i className="contact-icon email-icon"></i>
            <h3>Email Us</h3>
            <p>support@yourpodstore.com</p>
            <p>We usually respond within 24 hours</p>
          </div>
          
          <div className="contact-option">
            <i className="contact-icon chat-icon"></i>
            <h3>Live Chat</h3>
            <p>Available Monday-Friday</p>
            <p>9am - 5pm EST</p>
            <button className="chat-btn">Start Chat</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-container {
          max-width: 900px;
          margin: 30px auto;
          padding: 0 20px;
        }
        
        .faq-container h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        
        .search-container {
          margin-bottom: 30px;
        }
        
        .faq-search {
          width: 100%;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 50px;
          font-size: 1rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .faq-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .category-btn {
          padding: 8px 16px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .category-btn:hover {
          background-color: #e0e0e0;
        }
        
        .category-btn.active {
          background-color: #4a90e2;
          color: white;
        }
        
        .faq-list {
          margin-bottom: 50px;
        }
        
        .faq-item {
          margin-bottom: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .faq-question {
          padding: 20px;
          background-color: #f9f9f9;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
        }
        
        .faq-question:hover {
          background-color: #f0f0f0;
        }
        
        .faq-question h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #333;
          flex: 1;
        }
        
        .faq-icon {
          font-size: 1.5rem;
          color: #4a90e2;
          margin-left: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .faq-answer.active {
          max-height: 500px;
        }
        
        .faq-answer p {
          padding: 20px;
          margin: 0;
          border-top: 1px solid #e0e0e0;
          line-height: 1.6;
          color: #555;
        }
        
        .contact-section {
          text-align: center;
          background-color: #f5f5f5;
          padding: 30px;
          border-radius: 8px;
        }
        
        .contact-section h2 {
          margin-top: 0;
          color: #333;
        }
        
        .contact-options {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
          flex-wrap: wrap;
        }
        
        .contact-option {
          background-color: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          min-width: 250px;
          text-align: center;
        }
        
        .contact-icon {
          display: block;
          width: 50px;
          height: 50px;
          margin: 0 auto 15px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .email-icon {
          background-image: url('../assets/images/icon-mail.png');
        }
        
        .chat-icon {
          background-image: url('../assets/images/icon-chat.png');
        }
        
        .contact-option h3 {
          margin-top: 0;
          color: #333;
        }
        
        .contact-option p {
          margin: 5px 0;
          color: #666;
        }
        
        .chat-btn {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        
        .chat-btn:hover {
          background-color: #3a7bc8;
        }
        
        @media (max-width: 600px) {
          .faq-categories {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          
          .faq-categories::-webkit-scrollbar {
            display: none;
          }
          
          .contact-options {
            flex-direction: column;
            align-items: center;
          }
          
          .contact-option {
            width: 100%;
          }
          
          .faq-question h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;