import RegisterPage from "@/components/pages/registerPage";
import RegisterPageDesktop from "@/components/pages/registerPageDesktop";

function Register() {
  return (
    <>
      <RegisterPage className="md:hidden" />
      <RegisterPageDesktop className="hidden md:flex" />
    </>
  );
}

export default Register;
