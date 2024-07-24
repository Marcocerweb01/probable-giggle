import dynamic from "next/dynamic";
import AuthSessionProvider from "./AuthSessionProvider";

const EditPromptComponent = dynamic(() => import("./EditPromptComponent"), {
  ssr: false,
});

const EditPrompt = () => {
  return (
    <AuthSessionProvider>
      <EditPromptComponent />
    </AuthSessionProvider>
  );
};

export default EditPrompt;
