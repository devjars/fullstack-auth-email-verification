import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchUserEmail = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/get-email");

        if (res.data.success) {
          setUserEmail(res.data.data.email);
        } else {
          setError("Failed to fetch user email.");
        }
      } catch (err: any) {
        console.error("Error fetching user email:", err);
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h2 >Welcome, {userEmail}</h2>
    </div>
  );
}

export default Dashboard;
