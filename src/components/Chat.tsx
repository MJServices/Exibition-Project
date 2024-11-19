import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import useSound from "use-sound";

function Chat({onChatEnd}: any) {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string; delay: number }>
  >([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  const typingDotsRef = useRef<HTMLDivElement>(null);

  const [playTyping] = useSound("/Sound Effects/livechat-129007.mp3", {
    loop: false,
  });

  const scenarioMessages = [
    { text: "Hello ! Ayan bhai", data: null, sender: "bot", delay: 1000 },
    {
      text: "Exibition kai din kareeb hai",
      data: null,
      sender: "bot",
      delay: 1000,
    },
    {
      text: "Hum participate kare hai",
      data: null,
      sender: "bot",
      delay: 1000,
    },
    { text: "Bohot maza ae ga", data: null, sender: "bot", delay: 1000 },
    { text: "Chal aja", data: false, sender: "bot", delay: 1000 },
  ];

  const scenarioChoices = [
    ["Kia khass hai", "kia kare phir"],
    ["Aja project banae", "Chal banate hai"],
  ];

  useEffect(() => {
    if (
      currentStep < scenarioMessages.length ||
      scenarioMessages[4].data !== false
    ) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, scenarioMessages[currentStep]]);
        playTyping(); // Play sound when message is shown
        if (currentStep % 2 === 1) {
          setChoices(scenarioChoices[Math.floor(currentStep / 2)]);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }, scenarioMessages[currentStep].delay);

      return () => {
        clearTimeout(timer);
      };
    }else{
      onChatEnd()
    }
  }, [currentStep, playTyping]);

  useEffect(() => {
    if (messagesEndRef.current) {
      gsap.from(messagesEndRef.current.lastElementChild, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (choicesRef.current) {
      gsap.from(choicesRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [choices]);

  useEffect(() => {
    if (isTyping && typingDotsRef.current) {
      gsap.to(typingDotsRef.current.children, {
        y: -3,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [isTyping]);

  const handleChoice = (choice: string) => {
    setMessages((prev) => [
      ...prev,
      { text: choice, sender: "user", delay: 0 },
    ]);
    setChoices([]);
    setCurrentStep((prev) => prev + 1);
    playTyping(); // Play sound when choice is answered
  };

  return (
    <section className="bg-black flex justify-center items-center h-screen w-screen">
      <section className="w-screen h-screen sm:w-[35vw] sm:h-[90vh] bg-black flex justify-center items-center p-4">
        <div className="w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
          <div
            ref={messagesEndRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`rounded-full py-3 px-5 max-w-[95%] ${
                    message.sender === "bot"
                      ? "bg-indigo-800 text-white"
                      : "bg-indigo-800 text-white"
                  } shadow-md transition-all duration-300 hover:shadow-lg`}
                >
                  <p className="text-white text-lg sm:text-xl font-normal">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-indigo-700 rounded-full p-3 shadow-md">
                  <div ref={typingDotsRef} className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {choices.length > 0 && (
            <div className="p-4">
              <div
                ref={choicesRef}
                className="flex flex-wrap gap-6 justify-center"
              >
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-900 transition-all duration-300 text-lg sm:text-xl  font-normal shadow-md hover:shadow-lg"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

export default Chat;
