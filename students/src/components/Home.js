import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const students = ["Alexai", "Rahul", "Priya", "Sneha"];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student List</h2>

      {students.map((student, index) => (
        <p key={index}>
          <Link to={`/student/${student}`}>{student}</Link>
        </p>
      ))}

      <button
        onClick={() => navigate("/student/Riya")}
        style={{ marginTop: "20px", padding: "8px 16px" }}
      >
        Go to Default Student (Riya)
      </button>
    </div>
  );
}

export default Home;
