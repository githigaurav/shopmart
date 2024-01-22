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

const addProduct= new yup.ObjectSchema({

    name:yup.string()
    .required("Product name is required")
    .min(3, "Minimum 3 character is required")
    .max(72, "Maximum character limit is reached")
    .matches(/^[a-zA-Z]+$/, "The name should have letters only"),

    brand:yup.string().required("Brand name is required")
    .min(3, "Minimum 3 character is required")
    .max(72, "Maximum character limit is reached"),

    price:yup.string().required("Price is required")
    .matches(/^[0-9]+$/, "The price should have numbers only"),

    category:yup.string()
    .required("Category is required"),

    subCategory:yup.string()
    .required("Sub Category is required"),

    returnPolicy:yup.string()
    .required("Please select return policy"),

    warranty:yup.string()
    .required("Please Select warranty"),

    paymentMethod:yup.string()
    .required("Please select Payment Mode"),

    discount:yup.string()
    .required("Please select discount"),

    size:yup.string()
    .required("Please select size"),

    quantity:yup.string()
    .required("Product quantity is required")
    .matches(/^[0-9]+$/, "The Quantity should have numbers only"),

    discription:yup.string()
    .required("Prodcut discription is required")
        


})

const address = new yup.ObjectSchema({
    houseNo: yup.string().required("Houe No is required"),
    location: yup.string().required("Location is required").min(3, "Minimum 3 character is required").max(72,"Maximum password length is reached"),
    city: yup.string().required("City is required").min(3, "Minimum 3 character is required").max(72,"Maximum password length is reached"),
    state: yup.string().required("State is required").min(3, "Minimum 3 character is required").max(72,"Maximum password length is reached"),
    pinCode: yup.string().required("Location is required").min(6, "Valid pin code is required").max(6,"Invalid Pin Code").matches(/^[0-9]+$/, "Pin code should be numbers only"),

})




export {loginVal, signupVal, addProduct , address}