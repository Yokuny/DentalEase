import Link from "next/link";

const DentalEaseLogo = () => {
  return (
    <div className="w-full md:block hidden">
      <div className="flex text-center">
        <Link
          href="/home"
          className="p-5 py-0 h-9 rounded bg-gradient-to-r from-primaryBlue via-primaryBlue to-sky-500 text-white flex justify-center items-center cursor-pointer hover:saturate-150">
          <h1 className="text-lg font-bold">Dental</h1>
          <h4 className="text-lg font-light">Ease</h4>
        </Link>
      </div>
    </div>
  );
};

export default DentalEaseLogo;
