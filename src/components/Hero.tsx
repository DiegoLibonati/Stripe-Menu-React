import phone from "../assets/phone.svg";
import { useGlobalContext } from "../contexts/context";
import "../Hero.css";

const Hero = (): JSX.Element => {
  const { handleDesktopMenuClose } = useGlobalContext()!;

  const handleDesktopClose: React.MouseEventHandler<HTMLElement> = () => {
    handleDesktopMenuClose();
  };

  return (
    <section className="hero_container" onMouseOver={handleDesktopClose}>
      <article className="hero_container_information">
        <h1>
          Payments infrastructure <br />
          for the internet
        </h1>
        <p>
          Millions of companies of all sizes—from startups to Fortune 500s—use
          Stripe’s software and APIs to accept payments, send payouts, and
          manage their businesses online
        </p>
        <button type="button">Start now</button>
      </article>

      <article className="hero_container_phone">
        <img src={phone} alt="phone"></img>
      </article>
    </section>
  );
};

export default Hero;
