import './Resume.css';

function Resume() {
    return (
        <>
            <div className="resume-container col-12 d-flex justify-content-between">

                <div className="resume d-flex justify-content-between">
                    <div className="resume-item">
                        <h6>
                            Salas
                        </h6>
                        <h3>
                            3
                        </h3>
                    </div>

                    <div className="resume-item">
                        <h6>
                            Apostas
                        </h6>
                        <h3>
                            2
                        </h3>
                    </div>


                    <div className="resume-item">
                        <h6>
                            Lucro
                        </h6>
                        <h3>
                            0
                        </h3>
                    </div>
                </div>

                <div className="resume-item">
                    <h6>
                        Saldo
                    </h6>
                    <h3>
                        $ 1000
                    </h3>
                </div>


            </div>
        </>
    );
}

export default Resume;