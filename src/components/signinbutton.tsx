"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignin = () => {
    router.push("/signin");
  };
  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };
  if (session && session.user) {
    return (
      <>
        <p>{session.user.name}</p>
        <button className="btn btn-danger" onClick={handleSignOut}>
          SignOut
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={handleSignin} className="btn btn-primary">
        SignIn
      </button>
    </>
  );
};
export default SigninButton;
