import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

function App() {
  const [certId, setCertId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContract = async (withSigner = false) => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    if (withSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, abi, signer);
    }
    return new ethers.Contract(contractAddress, abi, provider);
  };

  async function issue() {
    try {
      setLoading(true);
      const contract = await getContract(true);
      const tx = await contract.issueCertificate(certId, name, course, "DBATU University");
      await tx.wait();
      alert("Certificate Issued! Tx: " + tx.hash);
    } catch (e) { alert(e.reason || e.message); }
    setLoading(false);
  }

  async function verify() {
    try {
      setLoading(true);
      const contract = await getContract(false);
      const data = await contract.verifyCertificate(certId);
      setResult({
        name: data[0],
        course: data[1],
        inst: data[2],
        date: new Date(Number(data[3]) * 1000).toLocaleDateString(),
        valid: data[4]
      });
    } catch (e) { alert("Certificate Not Found"); setResult(null); }
    setLoading(false);
  }

  return (
    <div style={{ padding: 30, fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>Certificate Verification DApp</h1>
      <input placeholder="Certificate ID e.g. CERT101" value={certId} onChange={e => setCertId(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
      <input placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
      <input placeholder="Course Name" value={course} onChange={e => setCourse(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
      <button onClick={issue} disabled={loading} style={{ padding: 10, marginRight: 10 }}>Issue Certificate (Admin)</button>
      <button onClick={verify} disabled={loading} style={{ padding: 10 }}>Verify Certificate</button>
      {result && (
        <div style={{ marginTop: 20, border: '1px solid #ccc', padding: 15, background: result.valid? '#e6ffe6' : '#ffe6e6' }}>
          <h3>Name: {result.name}</h3>
          <p>Course: {result.course}</p>
          <p>Institution: {result.inst}</p>
          <p>Date: {result.date}</p>
          <h2>{result.valid? "✅ Valid Certificate" : "❌ Revoked / Invalid"}</h2>
        </div>
      )}
    </div>
  );
}
export default App;