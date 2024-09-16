export const PlanSelection = () => {
  return (
    <div className="container">
      <h2 className="mb-14 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Välj abonnemang och kom igång gratis redan idag.</h2>
      <ul className="grid gap-8 md:grid-cols-3">
        <li className="rounded-3xl border border-tic-stroke p-4">Free</li>
        <li className="rounded-3xl border border-tic-stroke p-4">Basic</li>
        <li className="rounded-3xl border border-tic-stroke p-4">Premium</li>
      </ul>
    </div>
  );
};
