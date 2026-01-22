import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Landing } from "./pages/Landing";
import { ThankYou } from "./pages/ThankYou";
import { Admin } from "./pages/Admin";
import { Partners } from "./pages/Partners";
import { CityLanding } from "./pages/CityLanding";
import { ToastProvider } from "./components/ToastProvider";
import { getAllCitySlugs } from "./lib/cityContent";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "thankyou" | "admin" | "partners" | "city">("landing");
  const [citySlug, setCitySlug] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    // Check for city pages first (e.g., /geneve, /lausanne)
    const pathSegments = path.split("/").filter(Boolean);
    const possibleCitySlug = pathSegments[0];
    const validCitySlugs = getAllCitySlugs();

    if (possibleCitySlug && validCitySlugs.includes(possibleCitySlug)) {
      setCurrentPage("city");
      setCitySlug(possibleCitySlug);
      return;
    }

    // Check query params for special pages
    if (params.get("admin") === "1") {
      setCurrentPage("admin");
    } else if (params.get("thankyou") === "1") {
      setCurrentPage("thankyou");
    } else if (params.get("partners") === "1" || params.get("partenaires") === "1") {
      setCurrentPage("partners");
    } else {
      setCurrentPage("landing");
    }
  }, []);

  return (
    <HelmetProvider>
      <ToastProvider>
        {currentPage === "admin" && <Admin />}
        {currentPage === "thankyou" && <ThankYou />}
        {currentPage === "partners" && <Partners />}
        {currentPage === "city" && <CityLanding citySlug={citySlug} />}
        {currentPage === "landing" && <Landing />}
      </ToastProvider>
    </HelmetProvider>
  );
}

export default App;
