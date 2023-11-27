import { useState, useEffect } from "react";

const Voters = ({ state }) => {
  const [voters, setVoters] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchVoters = async () => {
      const voters = await contract.getVoters();
      setVoters(voters);
    };

    contract && fetchVoters();
  }, [contract]);

  return (
    <div className="container-fluid" style={{ width: "100%" }}>
      <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>DETAILS OF CASTED VOTES</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#96D4D4", border: "1px solid white", padding: "7px", width: "300px" }}>Name</th>
            <th style={{ backgroundColor: "#96D4D4", border: "1px solid white", padding: "7px", width: "300px" }}>Voter ID</th>
            <th style={{ backgroundColor: "#96D4D4", border: "1px solid white", padding: "7px", width: "300px" }}>Date&Time of Vote</th>
            <th style={{ backgroundColor: "#96D4D4", border: "1px solid white", padding: "7px", width: "300px" }}>Voted Party</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter.timestamp}>
              <td style={{ border: "1px solid white", padding: "7px", width: "300px" }}>{voter.name}</td>
              <td style={{ border: "1px solid white", padding: "7px", width: "300px" }}>{String(voter.voterID)}</td>
              <td style={{border: "1px solid white", padding: "7px", width: "300px" }}>{new Date(Number(voter.timestamp)*1000).toLocaleString()}</td>
              <td style={{ border: "1px solid white", padding: "7px", width: "300px" }}>{voter.partyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Voters;
