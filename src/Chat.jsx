import { useState } from 'react';
import chatbot from './chatbot.png';

const sendQuestion = async (question) => {
  const response = await fetch(
    'https://code-penal-fr.onrender.com/api/v1/prediction/1cfac65f-3c7d-4615-8682-09fb5e76ddd3',
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
      role: 'bot',
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

    setQuestion('');
    setLoading(true);

    setMessages((messages) => [
      ...messages,
      { message: question, date: new Date(), role: 'user' },
    ]);

    const message = await sendQuestion(question);

    setMessages((messages) => [
      ...messages,
      { message, date: new Date(), role: 'bot' },
    ]);

    setLoading(false);
    setQuestion('');
  };

  return (
    <>
      <div className="mt-16">
        {messages.map(({ message, date, role }) => (
          <div
            className="overflow-hidden px-5 rounded-xl bg-white shadow sm:rounded-lg flex justify-between gap-x-6 py-5 my-8"
            key={date}
          >
            <div class="flex gap-x-6 text-left">
              {role === 'bot' ? (
                <img src={chatbot} className="h-12 w-12" />
              ) : (
                <svg
                  className="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
              <div class="min-w-0 flex-auto">
                <div class="text-sm font-semibold text-gray-900">
                  {role === 'bot' ? 'Code Facile Bot' : 'You'}
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
              className="block mx-4 p-2.5 w-full text-sm rounded-lg borderxz bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Poser votre question..."
              value={question}
              onChange={onChange}
            ></textarea>
            <button
              disabled={isLoading}
              type="submit"
              className="absolute left-full inline-flex justify-center p-2 text-white rounded-full cursor-pointer hover:bg-gray-600"
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
