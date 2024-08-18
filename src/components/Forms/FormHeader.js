import './FormHeader.css'

function FormHeader(props) {
    return (
        <>
            <div>
                <h2>
                    {props.title} &nbsp;&nbsp;&nbsp;
                </h2>
                <h4 className="mt-2 mb-5">
                    {props.subtitle}
                </h4>
            </div>
        </>
    )
}

export default FormHeader;