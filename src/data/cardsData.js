import React, { useState, useEffect, useRef } from "react";
import CardiologistImg from "../assets/Images/commonImg/Cardiologist.png";
import GynaecologistImg from "../assets/Images/homeImg/gynaecologist.png";
import DentistImg from "../assets/Images/homeImg/Dentist.png";
import GastroenterologistImg from "../assets/Images/homeImg/Gastrologist.png";
import OrthopedistImg from "../assets/Images/homeImg/Orthopedist.png";
import DiagnosticsImg from "../assets/Images/homeImg/Diagnostics.png";
import DermatologistImg from "../assets/Images/homeImg/Dermatologist.png";
import GeneralPhysicianImg from "../assets/Images/homeImg/general physicians.png";
import NeurologistImg from "../assets/Images/homeImg/Neurologist.png";
import PhysiotherapistImg from "../assets/Images/homeImg/physiotherapist.png";
import PediatricianImg from "../assets/Images/homeImg/Pediatrician.png";
import PulmonologistImg from "../assets/Images/homeImg/pulmonologist.png";

const cardsData = [
  {
    title: "Cardiologist",
    img: CardiologistImg,
    description: "Expert Care for a Healthier Heart",
    category: "Cardiologist"
  },
  {
    title: "Gynaecologist",
    img: GynaecologistImg,
    description: "Women's health, expert care",
    category: "Gynaecologist"
  },
  {
    title: "Dentist",
    img: DentistImg,
    description: "Strong Teeth,Bright Smiles",
    category: "Dentist"
  },
  {
    title: "Gastroenterologist",
    img: GastroenterologistImg,
    description: "Digestive health, better comfort",
    category: "Gastroenterologist"
  },
  {
    title: "Orthopedist",
    img: OrthopedistImg,
    description: "Stronger bones, better mobility",
    category: "Orthopedist"
  },
  {
    title: "Diagnostics",
    img: DiagnosticsImg,
    description: "Precise tests, accurate results.",
    category: "Diagnostics"
  },
  {
    title: "Dermatologist",
    img: DermatologistImg,
    description: "Healthy skin, glowing confidence",
    category: "Dermatologist"
  },
  {
    title: "General Physician",
    img: GeneralPhysicianImg,
    description: "Comprehensive care, healthy living",
    category: "General Physician"
  },
  {
    title: "Neurologist",
    img: NeurologistImg,
    description: "Your brain, our priority",
    category: "Neurologist"
  },
  {
    title: "Physiotherapist",
    img: PhysiotherapistImg,
    description: "Restoring movement, improving life",
    category: "Physiotherapist"
  },
  {
    title: "Pediatrician",
    img: PediatricianImg,
    description: "Caring for children's wellness",
    category: "Pediatrician"
  },
  {
    title: "Pulmonologist",
    img: PulmonologistImg,
    description: "Breathing easy, health restored",
    category: "Pulmonologist"
  },
];

export default cardsData;
