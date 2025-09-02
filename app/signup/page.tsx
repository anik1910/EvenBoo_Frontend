import Link from "next/link";
export default function SignupPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#14171c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <form>
        <div className="signup-container">
          <div className="signup-title">
            <p>Register</p>
          </div>
          <div className="signup-subtitle">
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
          <div className="field-container">
            <div>
              <label htmlFor="fname">Full Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter your First Name"
              />
              <p id="fname-error" className="error-message"></p>
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
              />
              <p id="email-error" className="error-message"></p>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
              />
              <p id="password-error" className="error-message"></p>
            </div>

            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm your Password"
              />
              <p id="cpassword-error" className="error-message"></p>
            </div>

            <div className="NID-attach">
              <p>Please Attach your NID</p>
              <input
                type="file"
                id="nid-file"
                name="nid_file"
                accept=".jpg, .jpeg, .png"
              />
              <p id="nid-error" className="error-message"></p>
            </div>

            <div>
              <input
                type="submit"
                name="submit"
                id="signup-btn"
                value="Sign Up"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
