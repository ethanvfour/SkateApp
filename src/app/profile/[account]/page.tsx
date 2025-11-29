import ProfileHeader from "./components/ProfileHeader";

export default async function SpecificProfile({
  params,
}: {
  params: Promise<{ account: string }>;
}) {
  const accName = (await params).account;
  return (
    <div className="min-h-screen">
      <div id="background-profile-name" className="w-full h-fit">
        <ProfileHeader profileName={accName} />
      </div>
      <div id="posts"></div>
    </div>
  );
}
