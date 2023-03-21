import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useCallback, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { getBrainReply } from "../brain";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import uuid from "short-uuid";
import { useAtomValue } from "jotai";
import { brainAtom } from "../atoms/brain";
import { sendOutline } from "ionicons/icons";

const botChatAnime: Variants = {
  initial: { x: "-10%", opacity: 0, scale: 1.068 },
  animate: { x: 0, opacity: 1, scale: 1 },
};

const userChatAnime: Variants = {
  initial: { x: "10%", opacity: 0, scale: 1.068 },
  animate: { x: 0, opacity: 1, scale: 1 },
};

type ChatsType = {
  id: string | uuid.SUUID;
  by: "bot" | "user";
  message: string | React.ReactNode;
}[];

const ChatBot: React.FC = () => {
  const [chats, setChats] = useState([] as ChatsType);
  const textBox = useRef<HTMLIonTextareaElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const submitBtnRef = useRef<HTMLIonButtonElement>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const brain = useAtomValue(brainAtom);

  const answerWithoutUserInput = useCallback(
    async (q: string) => {
      if (!brain) return;
      const { answer } = await getBrainReply(q);

      // if multiple answers is returned
      if (Array.isArray(answer)) {
        const answersChats: ChatsType = answer.map((a) => ({
          by: "bot",
          id: uuid.generate(),
          message: a,
        }));
        setChats((chats) => [...chats, ...answersChats]);
      } else {
        const answerChat: ChatsType[0] = {
          by: "bot",
          id: uuid.generate(),
          message: answer,
        };
        setChats((chats) => [...chats, answerChat]);
      }
    },
    [brain]
  );

  const onUserQuery = useCallback(
    async (query: string) => {
      if (!brain) return;
      const answerChat: ChatsType[0] = {
        id: uuid.generate(),
        by: "user",
        message: query,
      };
      // adding user's query to the chat
      setChats([...chats, answerChat]);

      setIsBotTyping(true);
      const { answer } = await getBrainReply(query);
      setIsBotTyping(false);

      // if multiple answers is returned
      if (Array.isArray(answer)) {
        const answerChats: ChatsType = answer.map((a) => ({
          by: "bot",
          id: uuid.generate(),
          message: a,
        }));
        setChats((chats) => [...chats, ...answerChats]);
      } else {
        const answerChat: ChatsType[0] = {
          by: "bot",
          id: uuid.generate(),
          message: answer,
        };
        setChats((chats) => [...chats, answerChat]);
      }

      // scrolling into bottom of the chat
      setTimeout(() => {
        contentRef.current?.scrollToBottom(500);
      }, 250);
    },
    [brain, chats]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" ref={contentRef}>
        <div className="my-3 w-full flex items-center flex-col justify-center text-center prose max-w-none">
          {/* <SubhanallahSvg className="w-40 h-auto m-0 fill-[hsla(var(--b1)/var(--tw-bg-opacity,1))]" /> */}

          <IonText color="dark">
            <p className="text-xs m-0">
              In the name of Allah,
              <br /> the Entirely Merciful the Especially Merciful
            </p>
          </IonText>
        </div>

        {chats.map(({ by, id, message }, indx) => {
          // if bot is typing
          return by === "bot" ? (
            <motion.div
              key={indx}
              variants={botChatAnime}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2, ease: "circOut" }}
              className="flex justify-start duration-200"
            >
              <IonChip
                color="dark"
                className="max-h-none max-w-[80%] h-auto inline-block text-base"
              >
                {/* if message is typeof string */}
                {typeof message === "string" ? (
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ node, ...props }) => (
                        <table
                          {...props}
                          className="table table-fixed [&>tbody>tr>td]:p-1"
                        />
                      ),
                    }}
                  >
                    {message}
                  </ReactMarkdown>
                ) : (
                  message
                )}
              </IonChip>
            </motion.div>
          ) : (
            // if user is typing
            <motion.div
              key={indx}
              variants={userChatAnime}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2, ease: "circOut" }}
              className="flex justify-end duration-200 ease-linear"
            >
              <IonChip
                color="primary"
                className="max-h-none max-w-[80%] h-auto inline-block text-base"
              >
                {message}
              </IonChip>
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
            <div className="chat-bubble duration-200 mb-0">
              <TypeAnimation
                sequence={["Typing...", 500, "Typing", 500]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
          </motion.div>
        )}

        <div className="fixed bottom-0 left-0 w-screen border-t border-neutral-400/20">
          <div className="relative px-4">
            <IonTextarea
              placeholder="Say assalamu alaikum..."
              rows={1}
              className="h-14 !bg-[var(--ion-color-medium-contrast)]"
              ref={textBox}
              autofocus
              onFocus={() =>
                setTimeout(() => {
                  contentRef.current?.scrollToBottom(500);
                }, 250)
              }
            ></IonTextarea>
            <IonButton
              fill="clear"
              size="default"
              className="absolute top-0 right-0 z-20"
              onClick={() => {
                if (!textBox.current?.value?.trim())
                  return textBox.current?.setFocus();

                const userQuery = textBox.current.value.trim();
                textBox.current.setFocus();
                textBox.current.value = "";
                onUserQuery(userQuery);
              }}
              ref={submitBtnRef}
              // className={`btn px-5 ${!Boolean(brain) && "loading"}`}
            >
              <IonIcon slot="icon-only" icon={sendOutline}></IonIcon>
            </IonButton>
          </div>
        </div>

        <div className="w-full h-12" />
      </IonContent>

      {/* <div className="flex items-stretch justify-between pt-2 form-control">
          <div className="input-group prose max-w-none">
            {/* <textarea
              className="textarea textarea-bordered resize-none w-full mr-1 font-bold"
              placeholder="Say assalamu alaikum..."
              rows={1}
              ref={textBox}
              autoFocus
              onFocus={() =>
                setTimeout(() => {
                  contentRef.current?.scrollToBottom(500);
                }, 250)
              }
            ></textarea> */}

      {/* </div>
        </div> */}
    </IonPage>
  );
};

export default ChatBot;
