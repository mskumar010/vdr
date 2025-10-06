import React from "react";
import "./ourFoundersPage.css";
import Cards from "./Cards";
import Fotter from "./footer";
import Anji from "../assets/Images/foundersImg/anji.jpg";
import Alekhya from "../assets/Images/foundersImg/alekhya.jpg";
import Bhadru from "../assets/Images/foundersImg/bhadru.jpg";
import Durga from "../assets/Images/foundersImg/Durga.jpg";
import Kiran from "../assets/Images/foundersImg/kiran.jpg";
import Mohan from "../assets/Images/foundersImg/mohan.jpg";
import Pavan from "../assets/Images/foundersImg/Pavan P.jpg";
import Praveen from "../assets/Images/foundersImg/Praveen.jpg";
import Sai from "../assets/Images/foundersImg/sai.jpg";
import Sandeep from "../assets/Images/foundersImg/sandeep.jpg";
import SaiSakth from "../assets/Images/foundersImg/SaiSakth.jpg";
import Shiva from "../assets/Images/foundersImg/Shiva.jpg";
import Vyshanavi from "../assets/Images/foundersImg/Vaishanavi.jpg";

const FounderPage = () => {
  const founderDetails = [
    {
      name: "Anjaneyulu Kadari",
      role: " Digital Marketing",
      image: Anji,
    },
    { name: "Alekhya Padala", role: "Java Developer", image: Alekhya },
    { name: "Bhadru Lotavath", role: "Java Developer", image: Bhadru },
    { name: "Praveen Puvvala", role: "Java Developer", image: Praveen },
    { name: "KiranVenkat Bishetti", role: "Software Developer", image: Kiran },
    { name: "Mohan Bishetti", role: "Data Analyst, Designer", image: Mohan },
    { name: "Sandeep Kumar M", role: "Full Stack Developer", image: Sandeep },
    { name: "Sai Saketh", role: "Data Engineer", image: SaiSakth },
    { name: "Shiva Banoth", role: "Full Stack Developer", image: Shiva },
    { name: "Vaishnavi G", role: "Full Stack Developer", image: Vyshanavi },
  ];

  return (
    <div className="founderPage-main">
      <h1 className="our-founder-and-devs">Our Founders and Devs</h1>
      <div className="founderpage-founder">
        <div className="founderpage-founder-div-img">
          <img
            className="founderpage-founder-img"
            src={Sai}
            alt="Sai Madiraju"
          />
        </div>
        <h2 className="founderpage-founder-h2">
          Sai Madiraju <br />
          Founder & CEO
          <p className="founderpage-founder-p">
            Founder Of: Hiscope Cyberlinks <br />
            EVAAP (Employment Verification and Academic Proofing) <br />
            VDr (Verified Doctor)
          </p>
        </h2>
      </div>
      <h2 className="founderpage-developer-h2">DEVELOPERS</h2>
      <div className="founderpage-developers">
        <ul className="founderpage-developers-ul">
          {founderDetails.map((dev, index) => (
            <li className="founderpage-developer-li" key={index}>
              <img src={dev.image} alt={dev.name} />
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FounderPage;
