import LoginPage from "@/components/pages/loginPage";
import LoginPageDesktop from "@/components/pages/loginPageDesktop";

function Login() {
  return (
    <>
      <LoginPageDesktop className="hidden md:flex" />
      <LoginPage className="md:hidden" />
    </>
  );
}

export default Login;
