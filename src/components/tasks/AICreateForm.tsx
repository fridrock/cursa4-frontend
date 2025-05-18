import { useState } from "react";

interface AiCreateFormProps {
  perform: (prompt: string) => void;
  close: () => void;
}

export default function AiCreateForm(taskFormProps: AiCreateFormProps) {
  let [prompt, setPrompt] = useState<string>("");

  return (
    <>
      <form className="absolute top-[20vh] left-[25vw] w-[50vw] p-[2vw] h-[60vh] flex flex-col rounded-[10px] bg-[#F3F3FF] border-2 border-red-500">
        <button
          className="bg-red-900 text-white px-4 py-2 rounded ml-[auto]"
          onClick={(e) => {
            e.preventDefault();
            taskFormProps.close();
          }}
        >
          Закрыть
        </button>
        <label className="text-3xl mb-[1vw]">
          Опишите задачу, когда она должна закончиться
        </label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={prompt}
          placeholder="Введите название задачи"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></input>

        <button
          className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
          onClick={async (e) => {
            e.preventDefault();
            taskFormProps.perform(prompt);
          }}
        >
          Создать
        </button>
      </form>
    </>
  );
}
