import Link from "next/link";
export default function LoginPage() {
  return (
    <form>
      <div className="login-parent">
        <div className="login-container">
          <div className="login-title">
            <p>Login</p>
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="log-email-box"
            placeholder="Enter your Email"
          />
          <br />
          <p id="email-error" className="error-message"></p>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="log-pass-box"
            placeholder="Enter your password"
          />
          <br />
          <p id="password-error" className="error-message"></p>

          <input type="checkbox" name="remember" id="remember-me" />
          <span>Remember Me</span>

          <div className="log-btn">
            <input type="submit" name="submit" id="login-btn" value="Sign In" />
          </div>

          <div className="foget-pass">
            <p>
              Don't have an account <Link href="/signup">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
