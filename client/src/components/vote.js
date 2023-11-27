const ethers = require("ethers");
const Vote = ({ state }) => {
  const CasteVote = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const voterID = document.querySelector("#voterID").value;
    const selectedParty = document.querySelector("#selectedParty").value;
    console.log(name,voterID,selectedParty,contract);
    const amount = { value: ethers.parseEther("0.001") };
    const transaction = await contract.registerVoter(name, voterID,selectedParty, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={CasteVote}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Voter ID</label>
            <input
              type="number"
              className="form-control"
              id="voterID"
              placeholder="Enter Your Voter ID Card Number"
            />
          </div>
          <div className="mb-3">
          <label className="form-label">Select Party</label>
          <select
            className="form-select"
            id="selectedParty"
          >
            <option value="">Select Party</option>
            <option value="AAP">AAP</option>
            <option value="BJP">BJP</option>
            <option value="Congress">Congress</option>
            <option value="NOTA">NOTA</option>
          </select>
        </div>
        <div class="d-grid gap-2">
        <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            VOTE
          </button>
        </div>
        </form>
      </div>
    </>
  );
};
export default Vote;