import { onGetAllAccountDomains } from '@/actions/settings';
import ConversationMenu from '@/components/conversations';
import Messager from '@/components/conversations/messager';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const ConversationPage = async () => {
  const domains = await onGetAllAccountDomains();

  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains?.domains} />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messager />
      </div>
    </div>
  );
};

export default ConversationPage;
