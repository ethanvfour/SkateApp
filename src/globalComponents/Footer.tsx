export default function Footer() {
  return (
    <footer className="min-h-[150px] flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-light text-xl">
          <span className="font-bold">SPOTS</span> is still under development
        </h1>
        <p>Join now and get early access on a fun community</p>
      </div>
      <p className="mt-auto">© Spots {new Date().getFullYear()}</p>
    </footer>
  );
}
    