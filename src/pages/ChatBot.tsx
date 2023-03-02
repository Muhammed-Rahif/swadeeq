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
      {
        by: "bot",
        id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        message: botReply ?? "I am having some technical difficulties",
      },
    ]);
    textBox.current.focus();
    textBox.current.value = "";
    contentRef.current?.scrollToBottom(500);
  }, [bot, chats]);

  return (
    <IonPage>
      <IonContent
        style={{ "--background": "hsla(var(--b1) / var(--tw-bg-opacity, 1))" }}
        className="ion-padding ![background:transparent]"
        ref={contentRef}
      >
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
