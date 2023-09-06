/* eslint-disable react/prop-types */

function Home({ theme }) {
  return (
    <>
      {theme == "night" ? (
        <div className="calc-screen bg-[url('src/assets/xxr-main.png')] bg-contain bg-no-repeat bg-center"></div>
      ) : (
        <div className="calc-screen bg-[url('src/assets/xxr-whiteBg.png')] bg-contain bg-no-repeat bg-center"></div>
      )}
      <div>Hello Wolrd!</div>
    </>
  );
}
export default Home;
