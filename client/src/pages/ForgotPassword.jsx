import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
import Spinner from '../components/Spinner'
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {
    let navigate = useNavigate()
    const [sendingOtp, setSendingOtp] = useState(false)
    const [resettingPassword, setResettingPassword] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRequestOtp = async (e) => {
        e.preventDefault()
        setSendingOtp(true)
        const response = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
      //alert(response.status)
        if (response.status== 200) {
            setOtpSent(true)
            toast.success('OTP sent successfully')
        } else {
            toast.error('Email does not exist')
        }
        setSendingOtp(false)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setResettingPassword(true)
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return;
        }
        const response = await fetch('http://localhost:3000/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: email, enteredOTP: otp, newPassword: newPassword }),
        })
        if (response.status === 200) {
            toast.success('Password reset successful. Please login with your new password')
            navigate('/login')
        } else {
            toast.error('Failed to reset password. Please try again later.')
        }
        setResettingPassword(false)
    }

    return (
        <>
            <div className="mt-4 px-2">
                {!otpSent ? (
                    <form
                        onSubmit={handleRequestOtp}
                        className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 backdrop-blur"
                    >
                        <h1 className="text-2xl font-bold text-gray-800 text-center">
                            <span className="underline underline-offset-8 decoration-7 decoration-pink-600">
                                Forgot Password
                            </span>
                        </h1>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Enter your email" />
                            </div>
                            <TextInput
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="email"
                                name="email"
                                placeholder="taskflow@gmail.com"
                                required
                                type="email"
                            />
                        </div>
                        <Button type="submit" className="mt-2 bg-pink-600">
                            {sendingOtp && <Spinner size={'4'} />}Request OTP
                        </Button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleResetPassword}
                        className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 backdrop-blur"
                    >
                        <h1 className="text-2xl font-bold text-gray-800 text-center">
                            <span className="underline underline-offset-8 decoration-7 decoration-pink-600">Reset Password</span>
                        </h1>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="otp" value="Enter OTP" />
                            </div>
                            <TextInput
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                id="otp"
                                name="otp"
                                placeholder="Enter OTP"
                                required
                                type="text"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="newPassword" value="New Password" />
                            </div>
                            <TextInput
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter new password"
                                minLength={6}
                                required
                                type="password"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="confirmPassword" value="Confirm Password" />
                            </div>
                            <TextInput
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                minLength={6}
                                required
                                type="password"
                            />
                        </div>
                        <Button type="submit" className="mt-2 bg-pink-600">
                            {resettingPassword && <Spinner size={'4'} />}Reset Password
                        </Button>
                    </form>
                )}
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default ForgotPassword
