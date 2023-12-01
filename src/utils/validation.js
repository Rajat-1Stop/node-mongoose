const PATTERN = {
    alpha: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Only alphabets are allowed for this field'
    },
    alphaNumeric: {
        value: /^[a-zA-Z0-9\s]+$/,
        message: 'Only alphanumeric are allowed for this field'
    },
    alphaSymbol: {
        value: /^[a-zA-Z-'_.\u00C0-\u024F\u1E00-\u1EFF\s]+$/,
        message: 'Only alphabets are allowed for this field'
    },
    alphaNumericSymbol: {
        value: /^[a-zA-Z0-9-,'_.\u00C0-\u024F\u1E00-\u1EFF\s]+$/,
        message: 'Only alphanumeric are allowed for this field'
    },
    numeric: {
        value: /^[0-9]+$/,
        message: 'Only numbers are allowed for this field'
    },
    passwordRegex: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: 'must be at least 8 characters, one uppercase, one lowercase, one number and one special character'
    },
};

const PEOPLE_VALIDATION_RULES = {
    nameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: 50,
            message: 'must be less then or equal to 50 characters.'
        },
        min: {
            value: 3,
            message: 'must be more then or equal to 3 characters.'
        },
        required: true
    },
    emailRule: {
        pattern: {
            value: '',
            message: 'email must be a valid email.'
        },
        max: {
            value: '',
            message: 'must be less then or equal to 50 characters.'
        },
        min: {
            value: '',
            message: 'must be more then or equal to 3 characters.'
        },
        required: true
    },
    phoneRule: {
        pattern: {
            value: '',
            message: 'Contact no. must be a valid number.'
        },
        max: {
            value: '14',
            message: 'must be less then or equal to 14 characters.'
        },
        min: {
            value: '8',
            message: 'must be more then or equal to 8 characters.'
        },
        required: true
    }
};

module.exports = {
    PATTERN,
    PEOPLE_VALIDATION_RULES
};