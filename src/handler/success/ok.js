const ok = (res, message, data = null, token = null) => {
    const response = {
        status: 200,
        success: true,
        message
    };

    if (token !== null) {
        response.token = token;
    }

    if (data !== null) {
        response.data = data;
    }

    return res.status(200).json(response);
};

module.exports = { ok };