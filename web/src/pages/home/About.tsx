export default function About() {
  return (
    <section className="flex py-10 h-[calc(100vh/2)] bg-gray-800 items-center rounded-3xl mx-4">
      <div className="flex flex-col sm:w-2/4 lg:w-3/4 w-4/4 mx-auto">
        <h1 className="text-4xl font-bold pb-3 text-white p-4">About Us.</h1>
        <p className="sm:text-2xl text-lg p-4 font-normal text-white">
          At WeGo! Harambe, we believe in the power of community coming
          together. “Harambe” is a Swahili word for “all pull together,” and
          that's exactly what we help you do. Whether you're celebrating a
          milestone, navigating a challenge, or bringing a dream to life, WeGo!
          Harambe is here to help you turn collective care into meaningful
          impact. Start your fundraiser today, and let's pull together.
        </p>
        <code className="font-light pt-3 text-lg text-gray-400 p-4">
          - CEO, Davies Wabuluka
        </code>
      </div>
    </section>
  );
}
