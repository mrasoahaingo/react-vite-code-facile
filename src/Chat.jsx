import { useState } from 'react';
import chatbot from './chatbot.png';

const sendQuestion = async (question) => {
  const response = await fetch(
    'https://code-penal-fr.onrender.com/api/v1/prediction/43c52b44-d424-48ba-b912-4ca584f4880b',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    }
  );

  const message = await response.text();

  return message;
};

export const Chat = () => {
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        'Bonjour ! Posez votre question dans le champ de saisi ci-dessous. Jessaierai de répondre du mieux que je peux !',
      date: new Date(),
    },
  ]);
  const [question, setQuestion] = useState('');

  const onChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setLoading(true);

    const message = await sendQuestion(question);

    setMessages((messages) => [...messages, { message, date: new Date() }]);
    setLoading(false);
    setQuestion('');
  };

  return (
    <>
      <div className="mt-16">
        {messages.map(({ message, date }, i) => (
          <div
            className="overflow-hidden px-5 bg-white shadow sm:rounded-lg flex justify-between gap-x-6 py-5 my-8"
            key={i}
          >
            <div class="flex gap-x-6 text-left">
              <img src={chatbot} className="h-12 w-12" />
              <div class="min-w-0 flex-auto">
                <div class="text-sm font-semibold text-gray-900">
                  Code Facile Bot
                </div>
                <div class="mt-1 text-sm text-gray-500">
                  {message.split('\\n').map((str) => (
                    <p className="mt-3">{str}</p>
                  ))}
                </div>
              </div>
            </div>
            <div class="hidden sm:flex sm:flex-col sm:items-end text-right">
              <p class="text-xs leading-5 text-gray-500">
                {date.toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        <div className="text-center">
          {isLoading && (
            <svg
              className="w-10 h-6 mx-auto"
              fill="currentColor"
              viewBox="0 0 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle fill="#fff" stroke="none" cx="6" cy="10" r="4">
                <animateTransform
                  attributeName="transform"
                  dur="0.5s"
                  type="translate"
                  values="0 2; 0 -2; 0 2"
                  repeatCount="indefinite"
                  begin="0.1"
                ></animateTransform>
                <animate
                  attributeName="opacity"
                  dur="0.5s"
                  values="0.2;1;0.2"
                  repeatCount="indefinite"
                  begin="0.1"
                ></animate>
              </circle>

              <circle fill="#fff" stroke="none" cx="20" cy="10" r="4">
                <animateTransform
                  attributeName="transform"
                  dur="0.5s"
                  type="translate"
                  values="0 2; 0 -2; 0 2"
                  repeatCount="indefinite"
                  begin="0.2"
                ></animateTransform>
                <animate
                  attributeName="opacity"
                  dur="0.5s"
                  values="0.2;1;0.2"
                  repeatCount="indefinite"
                  begin="0.2"
                ></animate>
              </circle>

              <circle fill="#fff" stroke="none" cx="34" cy="10" r="4">
                <animateTransform
                  attributeName="transform"
                  dur="0.5s"
                  type="translate"
                  values="0 2; 0 -2; 0 2"
                  repeatCount="indefinite"
                  begin="0.3"
                ></animateTransform>
                <animate
                  attributeName="opacity"
                  dur="0.5s"
                  values="0.2;1;0.2"
                  repeatCount="indefinite"
                  begin="0.3"
                ></animate>
              </circle>
            </svg>
          )}
        </div>
      </div>
      <div className="fixed text-center bottom-0 left-0 right-0 py-5 bg-gray-900">
        <form onSubmit={onSubmit} className="w-1/2 mx-auto">
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="relative flex items-center py-2">
            <textarea
              disabled={isLoading}
              id="chat"
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg borderxz focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Poser votre question..."
              value={question}
              onChange={onChange}
            ></textarea>
            <button
              disabled={isLoading}
              type="submit"
              className="absolute left-full inline-flex justify-center p-2 text-white rounded-full cursor-pointer hover:bg-blue-100 dark:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
