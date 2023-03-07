import { IonContent, IonFooter, IonPage } from "@ionic/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { RiSendPlane2Line } from "react-icons/ri";
import { TypeAnimation } from "react-type-animation";
import { getReply, trainBrain } from "../brain";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import uuid from "short-uuid";

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
  message: string | React.ReactNode;
}[];

const ChatBot: React.FC = () => {
  const [chats, setChats] = useState([] as ChatsType);
  const textBox = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [brain, setBrain] = useState<any>();

  useEffect(() => {
    async function load() {
      const brain = await trainBrain();
      setBrain(brain);
    }
    if (!brain) load();
  }, []);

  const answerWithoutUserInput = useCallback(
    async (q: string) => {
      if (!brain) return;
      const { answer } = await getReply(brain, q);

      if (Array.isArray(answer)) {
        setChats((chats) => [
          ...chats,
          ...answer.map(
            (a) =>
              ({
                by: "bot",
                id: uuid.generate(),
                message: a,
              } as any)
          ),
        ]);
      } else {
        setChats((chats) => [
          ...chats,
          {
            by: "bot",
            id: uuid.generate(),
            message: answer,
          },
        ]);
      }
    },
    [brain]
  );

  const onUserInput = useCallback(async () => {
    if (!brain) return;
    if (!textBox.current?.value) return textBox.current?.focus();

    const userQuery = textBox.current.value;
    textBox.current.focus();
    textBox.current.value = "";
    setChats([
      ...chats,
      {
        id: uuid.generate(),
        by: "user",
        message: userQuery,
      },
    ]);

    setIsBotTyping(true);
    const { answer } = await getReply(brain, userQuery);
    setIsBotTyping(false);

    if (Array.isArray(answer)) {
      setChats((chats) => [
        ...chats,
        ...answer.map(
          (a) =>
            ({
              by: "bot",
              id: uuid.generate(),
              message: a,
            } as any)
        ),
      ]);
    } else {
      setChats((chats) => [
        ...chats,
        {
          by: "bot",
          id: uuid.generate(),
          message: answer,
        },
      ]);
    }

    contentRef.current?.scrollToBottom(500);
  }, [brain, chats]);

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

          <div className="divider text-gray-400 py-5">
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
                className={`chat-bubble py-3 rounded-3xl duration-200 bg-white/30 before:hidden ${
                  isLastChatByBot ? "!rounded-bl-3xl mb-0" : ""
                }`}
              >
                {typeof message === "string" ? (
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ node, ...props }) => (
                        <table {...props} className="table" />
                      ),
                    }}
                  >
                    {message}
                  </ReactMarkdown>
                ) : (
                  message
                )}
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
                sequence={["Typing...", 500, "Typing", 500]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
          </motion.div>
        )}
      </IonContent>

      <IonFooter className="bg-[hsla(var(--b1)/var(--tw-bg-opacity,1))] pb-4 px-2">
        <div className="flex items-stretch justify-between pt-2 form-control">
          <div className="input-group">
            <textarea
              className="textarea !rounded-l-2xl w-full !outline !outline-base-200 mr-1 font-bold"
              placeholder="Say assalamu alaikum..."
              rows={1}
              ref={textBox}
              autoFocus
              onFocus={() =>
                setTimeout(() => {
                  contentRef.current?.scrollToBottom(500);
                }, 250)
              }
            ></textarea>

            <button
              onClick={onUserInput}
              ref={submitBtnRef}
              className={`btn bg-transparent px-5 !outline !outline-base-200 !rounded-r-2xl ${
                !Boolean(brain) && "loading"
              }`}
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
