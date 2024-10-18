import React, { useState, useEffect } from 'react';
import './ActionCampaign.css';

interface CampaignMessage {
    id: number;
    type: 'red' | 'orange' | 'green';
    emoji: string;
    content: string;
}

const campaignMessages: CampaignMessage[] = [
    { id: 1, type: 'red', emoji: '', content: '話しすぎ。相手が商品に関心を持った理由を尋ましょう。' },
    { id: 2, type: 'orange', emoji: '', content: '専門的な情報が多い、不明点がないか適宜確認しましょう。' },
    { id: 3, type: 'green', emoji: '', content: '他社商品から自社商品への買い替えを促してください。「ブランドスイッチ」のための質問を3段階で練り出しましょう。' },
    { id: 4, type: 'red', emoji: '', content: '質問内容が浅い。顧客のニーズを深掘りする質問をしてください。' },
    { id: 5, type: 'orange', emoji: '', content: '主観ではなくデータに基づいた提案をしましょう。' },
];

const ActionCampaign: React.FC = () => {
    const [visibleMessages, setVisibleMessages] = useState<CampaignMessage[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
        setVisibleMessages(prevMessages => {
            const nextMessage = campaignMessages[(prevMessages[0]?.id ?? 0) % campaignMessages.length];
            return [nextMessage, ...prevMessages.slice(0, 2)];
        });
        }, 5000); // 5秒ごとに切り替え

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="message-container">
        <h2 className="section-title"><img src="../public/images/Saltr_symbol.svg"></img>&nbsp;アクションカンペ</h2>
            {visibleMessages.map((message, index) => (
                <div key={message.id} className={`message message-${message.type} message-${index}`}>
                    <span className="emoji">{message.emoji}</span>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
    );
}

export default ActionCampaign;