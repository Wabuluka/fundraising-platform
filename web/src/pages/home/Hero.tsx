export default function Hero() {
  return (
    <section className="flex min-h-[calc(70vh)] bg-emerald-800 from-primary to-secondary sm:mt-10 pt-30">
      <div className="flex sm:flex-row flex-col sm:w-2/3 w-3/3 mx-auto items-center text-white pb-10 ">
        <div className="flex sm:w-2/4 w-4/4 justify-start rounded">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop"
            alt=""
            className="rounded-2xl"
          />
        </div>
        <div className="flex lg:w-2/4 sm:w-4/4 flex-col gap-4 lg:mx-0 sm:mx-20">
          <h1 className="text-5xl font-bold leading-[.95]">
            Join this
            <br /> cause, to save
            <br /> our wildlife
          </h1>
          <p className="font-normal text-lg md:text-lg leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero eos,
            aliquid voluptas doloribus a delectus nihil voluptatibus nobis
            facere tenetur quisquam earum adipisci maxime cupiditate at quod
            maiores iusto sed.
          </p>
          <button className="btn btn-ghost btn-outline bg-amber-200 w-1/3 text-black h-12">
            Donate
          </button>
        </div>
      </div>
    </section>
  );
}
