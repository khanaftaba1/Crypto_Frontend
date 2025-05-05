function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    

    if (!values.email) {
        error.email = "Enter Valid Email";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Use a valid Email";
    } else {
        error.email = "";
    }

    if (!values.password) {
        error.password = "Enter Password";
    } else if (!password_pattern.test(values.password)) {
        error.password = "At least 8 characters, 1 uppercase and 1 number";
    } else {
        error.password = "";
    }

    if (!values.confirmPassword) {
        error.confirmPassword = "Enter Password";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Passwords doesnot match";
    } else {
        error.confirmPassword = "";
    }

    return error;
}

export default Validation;
