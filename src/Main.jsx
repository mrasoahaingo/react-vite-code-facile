import { Chat } from './Chat.jsx';

export const Main = () => (
  <main className="space-y-40 mb-40">
    <div className="relative" id="home">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="tracking-tighter text-gray-900 dark:text-white text-5xl md:text-6xl xl:text-7xl">
              <div className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Comprenez le Code Pénal
              </div>{' '}
              <div className="text-7xl font-black text-primary dark:text-white">
                facilement.
              </div>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              "Code Facile" est un chatbot conçu pour rendre la compréhension du
              droit pénal accessible à tous. Grâce à sa simplicité et sa
              convivialité, Code Facile aide les utilisateurs à comprendre
              facilement les articles complexes du Code Pénal français. Avec des
              explications claires et des exemples concrets, Code Facile guide
              les utilisateurs à travers le processus de compréhension du Code
              Pénal&nbsp;!
            </p>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  </main>
);
