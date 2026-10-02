const signupTemplate = ({ username, otp }) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">

            <div style="
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 30px;
                border-radius: 8px;
            ">

                <h2>Welcome to MILA ❤️</h2>

                <p>Hello <strong>${username}</strong>,</p>

                <p>
                    Thank you for signing up.
                    Use the OTP below to verify your email address.
                </p>

                <div style="
                    text-align:center;
                    margin:30px 0;
                ">
                    <span style="
                        font-size:32px;
                        letter-spacing:8px;
                        font-weight:bold;
                    ">
                        ${otp}
                    </span>
                </div>

                <p>
                    This OTP is valid for
                    <strong>60 seconds</strong>.
                </p>

                <p>
                    If you didn't request this email,
                    you can safely ignore it.
                </p>

                <hr>

                <p style="color:gray;font-size:12px;">
                    © MILA
                </p>

            </div>

        </body>
        </html>
    `;
};

module.exports = {
    signupTemplate,
};