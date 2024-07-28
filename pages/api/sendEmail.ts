import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to: string, tempPassword: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: '임시 비밀번호 발급',
    text: `임시 비밀번호는 ${tempPassword} 입니다.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('실행');
  if (req.method === 'POST') {
    const { email, tempPassword } = req.body;
    await sendEmail(email, tempPassword);
    res.status(200).json({ message: 'Email sent successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
