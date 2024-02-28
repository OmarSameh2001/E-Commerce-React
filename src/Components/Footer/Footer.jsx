import React from "react";

export default function Footer() {
  return (
    <div
      className="row mx-auto"
      style={{
        
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px",
      }}
    >
      <div className="col-md-8">
        <h4>
          Discover a world of endless possibilities with our Ecommerce Website.
        </h4>
        <h6>
          From endless collections to personalized recommendations, we strive to
          make your shopping experience seamless and enjoyable. Shop confidently
          with our secure payment options and hassle-free returns.
        </h6>

        <p>© 2024 E-commerce.</p>
      </div>
      <div className="col-md-4 text-center">
        <h4>Contact Us</h4>
        <p>Phone: +002-01012345678</p>
        <div className="">
          <i className="fab fa-facebook">
            <i className="fab fa-instagram mx-2"></i>
            <i className="fab fa-whatsapp"></i>
            <i className="fas fa-globe mx-2"></i>
          </i>
        </div>
      </div>
    </div>
  );
}
