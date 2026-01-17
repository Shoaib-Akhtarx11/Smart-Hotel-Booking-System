import SearchImg from "../../../assets/SearchDesktop.svg"
import CompareImg from "../../../assets/CompareDesktop.svg"
import SaveImg from "../../../assets/SaveDesktop.svg"


const Features = () => {
    return (
        <div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ marginLeft: "220px" }}>
                    <img src={SearchImg} alt="Search" />
                    <h3 className="text-center">Search Simply</h3>
                    <p className="text-center">Easily search through millions of</p>
                    <p className="text-center">hotels in seconds</p>
                </div>
                <div >
                    <img src={CompareImg} alt="Compare" height={140} />
                    <h3 className="text-center">Compare Confidently</h3>
                    <p className="text-center">Compare hotels from over</p>
                    <p className="text-center">100+ sites</p>
                </div>
                <div style={{ marginRight: "220px" }}>
                    <img src={SaveImg} alt="Save" />
                    <h3 className="text-center">Save Big</h3>
                    <p className="text-center">Discover a great deal to book on</p>
                    <p className="text-center">our partner sites</p>
                </div>

            </div>
        </div>
    )
}

export default Features
