import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading to true while processing

    // Simple form validation
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://interview.wpos.live/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Redirect to the dashboard or home page
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
