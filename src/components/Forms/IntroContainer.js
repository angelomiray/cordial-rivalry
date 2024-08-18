import './IntroContainer.css'

function IntroContainer(props) {
    return (
        <>
            <div id="welcome" className="col-lg-5 d-none d-lg-flex">
                <h1>
                    {props.h1}
                </h1>

                <h2 className="text-secondary">
                    {props.h2}
                </h2>

                <h5 className="text-secondary">
                    {props.h5}
                </h5>
            </div>
        </>
    )
}

export default IntroContainer;