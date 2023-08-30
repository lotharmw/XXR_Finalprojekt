/* eslint-disable react/prop-types */
import InfoSidebar from "../widgets/InfoSidebar";
import MyPost from "../widgets/MyPost";
import ProfileInfo from "../widgets/profileInfo";

function Home({ user, token }) {
  return (
    <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 max-w-screen-xl m-auto px-8 pt-4 calc-screen">
      <div>
        <ProfileInfo user={user} />
      </div>
      <div>
        <MyPost user={user} token={token} />
      </div>
      <div>
        <InfoSidebar user={user} />
      </div>
    </div>
  );
}

export default Home;
