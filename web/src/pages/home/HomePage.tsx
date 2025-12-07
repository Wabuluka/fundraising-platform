import Trending from "./Trending";
import Hero from "./Hero";
import About from "./About";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Trending />
      <About />
    </div>
  );
}
