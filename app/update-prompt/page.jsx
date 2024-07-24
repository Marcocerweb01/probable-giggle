import { Suspense } from "react";
import EditPromptComponent from "@components/EditPromptComponent";

const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPromptComponent />
    </Suspense>
  );
};

export default EditPrompt;
