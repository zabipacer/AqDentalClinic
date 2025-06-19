import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Layout from "./Layout";
import TeethScalingPolishingPage from "./pages/Polishing";
import FluorideTreatment from "./pages/Fluoride";
import TeethWhiteningPage from "./pages/TeethWHite";
import SmileMakeoverLandingPage from "./pages/SmileMakeover";
import DentalVeneersPage from "./pages/Veneers";
import DentalFillingsLandingPage from "./pages/DentalFillings";
import DentalCrownsBridgesLandingPage from "./pages/DentalCrown";
import DentalImplantsLandingPage from "./pages/DentalImplantsFaisalabad";
import BracesAndAlignersLandingPage from "./pages/Braces";
import RootCanalLandingPage from "./pages/RootCanal";
import WisdomToothExtractionLandingPage from "./pages/WisdomTooth";
import PediatricDentistryLandingPage from "./pages/Pediatric";
import GumDiseaseTreatment from "./pages/GumDisease";
import EmergencyDentistFaisalabad from "./pages/Emergency";
import MaxillofacialSurgeryFaisalabad from "./pages/Maxillofacial";
import TMJTreatmentFaisalabad from "./pages/Tmj";
import DentalCheckupLandingPage from "./pages/DentalCeckup";
import BookingSection from "./pages/booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/scaling-and-polishing-in-faisalabad", element: <TeethScalingPolishingPage /> },
      { path: "/Fluoride-Treatment-in-faisalabad", element: <FluorideTreatment /> },
      { path: "/Teeth-whitening-in-faisalabad", element: <TeethWhiteningPage /> },
      { path: "/Smile-Makeover-faisalabad", element: <SmileMakeoverLandingPage /> },
      { path: "/veneers-faisalabad", element: <DentalVeneersPage /> },
      { path: "/Dental-Fillings-faisalabad", element: <DentalFillingsLandingPage /> },
      { path: "/Dental-Crown-Bridges-Faisalabad", element: <DentalCrownsBridgesLandingPage /> },
      { path: "/Dental-implants-Faisalabad", element: <DentalImplantsLandingPage /> },
      { path: "/braces-aligners-faisalabad", element: <BracesAndAlignersLandingPage /> },
      { path: "/root-canal-faisalabad", element: <RootCanalLandingPage /> },
      { path: "/wisdom-tooth-extraction", element: <WisdomToothExtractionLandingPage /> },
      { path: "/kids-dentist-faisalabad", element: <PediatricDentistryLandingPage /> },
      { path: "/gum-disease-treatment", element: <GumDiseaseTreatment /> },
      { path: "/emergency-dentist-faisalabad", element: <EmergencyDentistFaisalabad /> },
      { path: "/maxillofacial-surgery", element: <MaxillofacialSurgeryFaisalabad /> },
      { path: "/tmj-treatment-faisalabad", element: <TMJTreatmentFaisalabad /> },
      { path: "/dental-checkup-faisalabad", element: <DentalCheckupLandingPage /> },
      { path: "/booking", element: <BookingSection /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
