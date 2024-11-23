import BgVideo from "./BgVideo";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <section className="w-screen h-screen">
      <BgVideo />
      <section className="relative z-[2] w-screen h-screen">
        <Navbar/>
        
      </section>
    </section>
  );
};
export default LandingPage;
