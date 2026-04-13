import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements to match the theme */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full flex justify-center">
                <AuthForm type="login" />
            </div>
        </div>
    );
}
