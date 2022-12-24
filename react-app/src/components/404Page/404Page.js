import { useHistory } from "react-router-dom";
import logo from "../../assets/new_bopify_logo-removebg-preview.png"


const FourZeroFourPage = () => {
    const history = useHistory()
    document.body.style = 'background: #1e1e1e';
    return (
        <div style={{ marginTop: "10%", display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}>
            <img src={logo} style={{ height: "10%", width: "10%" }} />
            <h1>Page not found</h1>
            <p style={{ marginTop: "-5px" }}>We can't seem to find the page you are looking for.</p>
            <button
                style={{ cursor: "pointer", backgroundColor: "white", borderRadius: "20px", height: "40px", width: "90px", fontWeight: "700", marginTop: "20px" }}
                onClick={(e) => history.push("/")}
            >Home
            </button>
        </div>
    )
}

export default FourZeroFourPage
