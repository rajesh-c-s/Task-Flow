import nodemailer from "nodemailer";

export const sendMail = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: "Taskflow Admin ",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
