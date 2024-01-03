import * as yup from 'yup'


const loginVal = new yup.ObjectSchema({
    email: yup.string().required("Email is required").email("Valid email is required"),
    password: yup.string().required("Passoword is required").min(3, "Minimum 3 character is required").max(72,"Maximum password length is reached")
})

const signupVal = new yup.ObjectSchema({
    email: yup.string().required("Email is required").email("Valid email is required"),
    password: yup.string().required("Passoword is required").min(3, "Minimum 3 character is required").max(72,"Maximum password length is reached"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Password does not matched")
})


export {loginVal, signupVal}