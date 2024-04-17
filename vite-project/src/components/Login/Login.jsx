import "./Login.css";
import Inputs from "../ui/Inputs.jsx";
import Button from "../ui/Button.jsx";

function Login() {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <Inputs type="email" name="email" label="Email" />
        <Inputs type="password" name="password" label="Password" />
        <Button type="submit" label="Log In" />
      </form>
    </div>
  );
}

export default Login;
