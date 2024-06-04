const LoginFailed = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <span>
        {" "}
        Login has failed.{" "}
        <a href="https://geminibykunaltajne.vercel.app/" className="underline">
          Try Again
        </a>
      </span>
    </div>
  );
};

export default LoginFailed;
