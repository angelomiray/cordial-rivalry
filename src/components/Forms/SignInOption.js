import './SignInOption.css';

function SignInOption(props) {
    return (
        <>
            <div className="option-card col-lg-5 col-12">
                <i className={props.icon}></i>
                <h3>{props.title}</h3>
            </div>
        </>
    );
}

export default SignInOption;