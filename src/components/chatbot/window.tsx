import { ChatBotMessageProps } from '@/schemas/conversation.schema';
import React, { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { BOT_TABS_MENU } from '@/constants/menu';
import ChatIcon from '@/icons/chat-icon';
import { TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import Bubble from './bubble';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Paperclip, Send } from 'lucide-react';
import { Label } from '../ui/label';
import { CardDescription, CardTitle } from '../ui/card';
import UploadButton from '../upload-button';
import Accordion from '../accordion';
import TabsMenu from '../tabs';
import RealTimeMode from './real-time';
import { Responding } from './responding';
import MySvgComponent from '@/icons/ai-assis';

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: 'assistant' | 'user'; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant';
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
    },
    ref
  ) => {
    console.log(errors);
    return (
      <div className="max-h-[560px]  w-[450px] flex flex-col  bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <MySvgComponent />
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">智能销售客户 </h3>
              <p className="text-sm">{domainName.split('.com')[0]}</p>
              {realtimeMode?.mode && <RealTimeMode setChats={setChat} chatRoomId={realtimeMode.chatroom} />}
            </div>
          </div>
          <div className="relative w-24 h-24">
            <Image src="/images/prop-user.png" fill alt="users" objectFit="contain" />
          </div>
        </div>

        <TabsMenu triggers={BOT_TABS_MENU} className=" bg-transparent border-[1px] border-border m-2">
          <TabsContent value="聊天">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                style={{
                  background: theme || '',
                  color: textColor || '',
                }}
                className="px-3 flex h-[300px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} />
                ))}
                {onResponding && <Responding />}
              </div>
              <form onSubmit={onChat} className="flex px-3 py-1 flex-col flex-1 bg-porcelain">
                <div className="flex justify-between">
                  <Input
                    {...register('content')}
                    placeholder="输入消息..."
                    className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none"
                  />
                  <Button type="submit" className="mt-3">
                    <Send />
                  </Button>
                </div>
                {/* <Label htmlFor="bot-image">
                  <Paperclip />
                  <Input {...register('image')} type="file" id="bot-image" className="hidden" />
                </Label> */}
              </form>
            </div>
          </TabsContent>

          <TabsContent value="帮助台">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>帮助台</CardTitle>
                <CardDescription>浏览常见问题列表。</CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpdesk.map((desk) => (
                <Accordion key={desk.id} trigger={desk.question} content={desk.answer} />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        {/* <div className="flex justify-center ">
          <p className="text-gray-400 text-xs">Powered By shiwo6324</p>
        </div> */}
      </div>
    );
  }
);

BotWindow.displayName = 'BotWindow';
