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

const chatsData: ChatsType = [
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "bot",
    message: "Assalamu alaikum, how can I help you?",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "user",
    message:
      "Tell me about the Prophet Muhammad (peace be upon him) and his companions.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "bot",
    message:
      "Prophet Muhammad (peace be upon him) was born in Mecca. He is the last prophet of Allah. Every prophet before him was sent to a specific people. But Prophet Muhammad (peace be upon him) was sent to all of mankind.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "user",
    message: "Oh, I see. What was his mission?",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "user",
    message: "I like to know more about him.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "bot",
    message:
      "He was sent to teach people how to worship Allah and to live a good life. He was sent to teach people how to be good to each other. He was sent to teach people how to be good to their parents, their children, their neighbors, and their friends.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "bot",
    message:
      "He was sent to teach people how to be good to animals and to the earth. He was sent to teach people how to be good to themselves. He was sent to teach people how to be good to their enemies. He was sent to teach people how to be good to their rulers.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "user",
    message: "Thanks for the information. I will read more about him.",
  },
  {
    id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    by: "bot",
    message: "You are welcome. May Allah bless you.",
  },
];

const ChatBot: React.FC = () => {
  const [chats, setChats] = useState(chatsData);
  const textBox = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);

  const onUserInput = useCallback(() => {
    if (!textBox.current?.value) return textBox.current?.focus();
    setChats([
      ...chats,
      {
        id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        by: "user",
        message: textBox.current.value,
      },
      //   {
      //     id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      //     by: "bot",
      //     message: textBox.current.value,
      //   },
    ]);
    textBox.current.focus();
    textBox.current.value = "";
    contentRef.current?.scrollToBottom(500);
  }, [chats]);

  useEffect(() => {
    const bot = new RiveScript();

    bot
      .loadFile(["../brain/main.rive"])
      .then(loading_done)
      .catch(loading_error as any);

    function loading_done() {
      console.log("Bot has finished loading!");

      // Now the replies must be sorted!
      bot.sortReplies();

      // And now we're free to get a reply from the brain!

      // RiveScript remembers user data by their username and can tell
      // multiple users apart.
      let username = "local-user";

      // NOTE: the API has changed in v2.0.0 and returns a Promise now.
      bot.reply(username, "Hello, bot!").then(function (reply) {
        console.log("The bot says: " + reply);
      });
    }

    // It's good to catch errors too!
    function loading_error(error: string, filename: any, lineno: any) {
      console.log("Error when loading files: " + error);
    }
  }, []);

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
