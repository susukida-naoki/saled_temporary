import React from 'react';
import './KnowledgeCampaign.css';

const KnowledgeCampaign: React.FC = () => {
    return (
        <div className="knowledge-campaign">
            <h3 className="knowledge-title"><img src="../public/images/dictionary.svg"></img>&nbsp;ナレッジカンペ</h3>
            <div className="knowledge-content">
                <p>
                    他社商品から自社商品への買い替えを促してください。「ブランドスイッチ」のための質問を3段階で繰り出しましょう。
                </p>
                <p>
                    コツはシンプルです。第1に顧客の「問題点」を炙り出す質問を行います。第2にライバルの「弱み」を際立たせる質問を行います。第3にライバルの弱みと顧客の問題点をつなげる質問を行います。
                </p>
            </div>
        </div>
    );
}

export default KnowledgeCampaign;