import { useGlobalContext } from "../../contexts/context";

import phone from "../../assets/phone.svg";

import "./Hero.css";

const Hero = (): JSX.Element => {
  const { handleDesktopMenuClose } = useGlobalContext()!;

  return (
    <section className="hero" onMouseOver={handleDesktopMenuClose}>
      <article className="hero__information">
        <h1>
          Payments infrastructure <br />
          for the internet
        </h1>
        <p>
          Millions of companies of all sizes—from startups to Fortune 500s—use
          Stripe’s software and APIs to accept payments, send payouts, and
          manage their businesses online
        </p>
        <button type="button" aria-label="start now">
          Start now
        </button>
      </article>

      <article className="hero__phone">
        <img src={phone} alt="phone"></img>
      </article>
    </section>
  );
};

export default Hero;
