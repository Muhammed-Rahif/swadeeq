import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from "@ionic/react";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { RiSendPlane2Line } from "react-icons/ri";
import { MdContactless, MdOutlineKeyboardVoice } from "react-icons/md";
import RiveScript from "rivescript";
import { TypeAnimation } from "react-type-animation";

const botChatAnime: Variants = {
  initial: { x: "-10%", opacity: 0, scale: 1.068 },
  animate: { x: 0, opacity: 1, scale: 1 },
};

const userChatAnime: Variants = {
  initial: { x: "10%", opacity: 0, scale: 1.068 },
  animate: { x: 0, opacity: 1, scale: 1 },
};

type ChatsType = {
  id: string;
  by: "bot" | "user";
  message: string;
}[];

const ChatBot: React.FC = () => {
  const [chats, setChats] = useState([] as ChatsType);
  const textBox = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [bot, setBot] = useState<RiveScript>();
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    const bot = new RiveScript();

    bot
      .loadFile(["/assets/brain/greetings.rive"])
      .then(() => {
        bot.sortReplies();

        setBot(bot);

        if (!textBox.current) return;
        textBox.current.value = "Hello bot";
        submitBtnRef.current?.click();
      })
      .catch(console.error);
  }, []);

  const onUserInput = useCallback(async () => {
    if (!bot) return;
    if (!textBox.current?.value) return textBox.current?.focus();

    const botReply = await bot
      .reply("local-user", textBox.current?.value || "Nothing to say")
      .catch(console.error);

    setChats([
      ...chats,
      {
        id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        by: "user",
        message: textBox.current.value,
      },
    ]);
    setIsBotTyping(true);
    textBox.current.focus();
    textBox.current.value = "";
    contentRef.current?.scrollToBottom(500);

    setTimeout(() => {
      setChats((chats) => [
        ...chats,
        {
          by: "bot",
          id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
          message: botReply ?? "I am having some technical difficulties",
        },
      ]);
      setIsBotTyping(false);
    }, 2260);
  }, [bot, chats]);

  return (
    <IonPage>
      <IonContent
        style={{ "--background": "hsla(var(--b1) / var(--tw-bg-opacity, 1))" }}
        className="ion-padding ![background:transparent]"
        ref={contentRef}
      >
        <div className="my-3 w-full flex items-center flex-col justify-center text-center">
          <img
            src="/assets/images/subhan-allah-word-arabic-calligraphy-art.png"
            alt="Subhanallah"
            className="w-40 h-auto"
          />

          <div className="divider text-gray-400">
            <small className="text-xs">
              In the name of Allah,
              <br /> the Entirely Merciful the Especially Merciful
            </small>
          </div>
        </div>

        {chats.map(({ by, id, message }, indx) => {
          const isLastChatByBot = chats[indx + 1]?.by === "bot";
          const isLastChatByUser = chats[indx + 1]?.by === "user";

          return by === "bot" ? (
            <motion.div
              key={indx}
              variants={botChatAnime}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2, ease: "circOut" }}
              className={`chat gap-0 duration-200 chat-start ${
                isLastChatByBot ? "pb-0" : ""
              }`}
            >
              <div
                className={`chat-bubble rounded-3xl duration-200 bg-white/30 before:hidden ${
                  isLastChatByBot ? "!rounded-bl-3xl mb-0" : ""
                }`}
              >
                {message}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={indx}
              variants={userChatAnime}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2, ease: "circOut" }}
              className={`chat gap-0 chat-end duration-200 ease-linear ${
                isLastChatByUser ? "pb-0" : ""
              }`}
            >
              <div
                className={`chat-bubble duration-200 ease-linear text-black bg-gradient-to-r from-orange-300 to-green-100 rounded-3xl before:hidden ${
                  isLastChatByUser ? "!rounded-br-3xl mb-0" : ""
                }`}
              >
                {message}
              </div>
            </motion.div>
          );
        })}

        {isBotTyping && (
          <motion.div
            variants={botChatAnime}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.2, ease: "circOut" }}
            className="chat gap-0 duration-200 chat-start"
          >
            <div className="chat-bubble rounded-3xl duration-200 bg-white/30 before:hidden !rounded-bl-3xl mb-0">
              <TypeAnimation
                sequence={["Typing...", 500, "Typi", 500]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
          </motion.div>
        )}
      </IonContent>

      <IonFooter className="bg-[hsla(var(--b1)/var(--tw-bg-opacity,1))] pb-4 px-2">
        <div className="flex items-stretch justify-between pt-2">
          <textarea
            className="textarea rounded-2xl w-full mr-1 font-bold"
            placeholder="Say assalamu alaikum..."
            rows={1}
            ref={textBox}
            onFocus={() =>
              setTimeout(() => {
                contentRef.current?.scrollToBottom(500);
              }, 250)
            }
          ></textarea>

          <div className="flex items-start">
            <button className="btn bg-transparent px-5 rounded-2xl">
              <MdOutlineKeyboardVoice size={22} />
            </button>
            <div className="divider divider-horizontal m-0 h-8 my-auto p-0 w-0 opacity-75" />
            <button
              onClick={onUserInput}
              ref={submitBtnRef}
              className="btn bg-transparent px-5 rounded-2xl"
            >
              <RiSendPlane2Line size={18} />
            </button>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ChatBot;
