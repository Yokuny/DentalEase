import PreviousPageBtn from "./previousPage.btn";
import RegisterStructure from "./Register.structure";
import LoginBtn from "./Login.btn";

const AuthStructure = () => {
  return (
    <>
      <LoginBtn />
      <div className="lg:p-8 mb-10 flex flex-col h-full justify-between">
        <RegisterStructure />
        <div className="w-full flex justify-center">
          <PreviousPageBtn />
        </div>
      </div>
    </>
  );
};

export default AuthStructure;
