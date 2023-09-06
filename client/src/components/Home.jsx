/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import x from "../assets/x-letter.svg";
import r from "../assets/r-letter.svg";
import fish from "../assets/fish.svg";
import snake from "../assets/snake.svg";
import dragon from "../assets/dragon.svg";

function Home({ theme }) {
  return (
    <>
      {theme == "night" ? (
        <div className="calc-screen bg-[url('src/assets/xxr-main.png')] bg-contain bg-no-repeat bg-center"></div>
      ) : (
        <div className="calc-screen bg-[url('src/assets/xxr-whiteBg.png')] bg-contain bg-no-repeat bg-center"></div>
      )}
      <div className="min-h-screen grid grid-cols-[1fr,2fr] max-w-screen-xl mx-auto items-center">
        <img
          className={`absolute rotate-[70deg] left-[40%] w-[17%] justify-self-end ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={snake}
          alt=""
        />
        <img
          className={`justify-self-end drop-shadow-2xl ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={x}
          alt=""
        />
        <div>
          <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-4/5 ml-8 z-10">
            <div className="card-body">
              <span className="crisis-main_title text-5xl pb-8">PLORE</span>
              <p className="unbound-title text-xl">
                Finde dein Event. Entdecke die für dich perfekte Veranstaltung.
                Egal wo, egal wann, egal was. Alle Genres, alle Clubs, alle
                Events.
              </p>
              <div>
                <button className="btn btn-primary mt-4">
                  <NavLink to="/xplore">xplore</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen grid grid-cols-[1fr,2fr] max-w-screen-xl mx-auto items-center relative">
        <img
          className={`absolute justify-self-end bottom-0 ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={fish}
          alt=""
        />
        <img
          className={`justify-self-end drop-shadow-2xl ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={x}
          alt=""
        />
        <div>
          <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-4/5 ml-8">
            <div className="card-body">
              <span className="crisis-main_title text-5xl pb-8">PERIENCE</span>
              <p className="unbound-title text-xl">
                Erlebe alles - nur besser. Erlebe Video, Audio, Sets und Medien
                die dir Gänsehaut bereiten. Finde die Informationen die dir
                einen entspannten Ablauf.
              </p>
              <div>
                <button className="btn btn-primary mt-4">
                  <NavLink to="/xperience">xperience</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen grid grid-cols-[1fr,2fr] max-w-screen-xl mx-auto items-center">
        <img
          className={`absolute rotate-[-70deg] left-[55%] w-1/5 mb-60 justify-self-end ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={dragon}
          alt=""
        />
        <img
          className={`justify-self-end drop-shadow-2xl ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={r}
          alt=""
        />
        <div>
          <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-4/5 ml-8">
            <div className="card-body">
              <span className="crisis-main_title text-5xl pb-8">EMEMBER</span>
              <p className="unbound-title text-xl">
                Deine Erinnerungen an einem Ort. Für dich - und wenn du willst
                für die ganze Welt. Deine Fotos, deine Videos und die besten
                Momente. Everything not saved will be lost 😉
              </p>
              <div>
                <button className="btn btn-primary mt-4">
                  <NavLink to="/remember">remember</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
