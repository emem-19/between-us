import React, { useState } from "react";

/**
 * 「小紙條」朋友對話卡片
 * -----------------------------------------------
 * 資料放在最下面的 CARDS 陣列，之後要新增只要往陣列裡加物件就好：
 *   單句： { tag: "分類標籤", lines: [ { who: "說話的人", text: "內容" } ] }
 *   對話： { tag: "分類標籤", lines: [ { who: "A", text: "..." }, { who: "B", text: "..." } ] }
 * tag 是可有可無的小標籤，用來標示這句是哪個系列（例如「小丑認證」）。
 * 之後要大批匯入，只要照這個格式整理成清單貼進來即可，沒有筆數上限。
 */

const CARDS = [
  // ===== 小丑與可悲兒 =====
  { tag: "小丑認證", lines: [{ who: "麗寶", text: "我是小丑嗎？好婚市集小丑。" }] },
  { tag: "小丑認證", lines: [{ who: "Emmy.W", text: "嗨，小丑。" }] },
  { tag: "小丑認證", lines: [{ who: "麗寶", text: "請路上的人不要發傳單給我，我是小丑。請頒給我最佳小丑獎。" }] },
  { tag: "小丑認證", lines: [{ who: "Emmy.W", text: "妳想說的就是：妳是個小丑。" }] },
  { tag: "小丑認證", lines: [{ who: "麗寶", text: "多管閒事的麗寶，就是全宇宙最大的小丑。" }] },
  { tag: "小丑認證", lines: [{ who: "麗寶", text: "全世界最可悲的小丑，Me。" }] },
  { tag: "小丑認證", lines: [{ who: "Emmy.W", text: "我們對話裡提過 128 次小丑。" }] },
  { tag: "小丑認證", lines: [{ who: "麗寶", text: "我是小丑，我要設鬧鐘。" }] },
  { tag: "小丑認證", lines: [{ who: "Emmy.W", text: "瞧不起真正的小丑。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "那今天中午沒人一起吃飯，可悲兒。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "可悲兒要去洗澡。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "我根本是被 line 針對，可悲兒。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "Emmy.W", text: "可悲的你我。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "我的人生，真是可悲。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "可悲至極。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "Emmy.W", text: "最可悲的應該是我，因為我還在寫社團發文。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "我就是一個雙標怪，反反覆覆，朝令夕改。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "我真的是臭假粉。" }] },
  { tag: "可悲兒宣言", lines: [{ who: "麗寶", text: "妳是我的社交禮儀導師。" }] },

  // ===== 乞丐美學 =====
  { tag: "乞丐美學", lines: [{ who: "麗寶", text: "這些臭乞丐、臭窮人。" }] },
  { tag: "乞丐美學", lines: [{ who: "麗寶", text: "我住火車站……聽起來像乞丐，住在火車站的紙箱。" }] },
  { tag: "乞丐美學", lines: [{ who: "麗寶", text: "我就是個無名小卒，做什麼都不過。" }] },
  { tag: "乞丐美學", lines: [{ who: "Emmy.W", text: "乞丐英雄。" }] },
  { tag: "乞丐美學", lines: [{ who: "Emmy.W", text: "只點 199 的永遠是那同一批乞丐。" }] },
  { tag: "乞丐美學", lines: [{ who: "麗寶", text: "我把『免費』放大，因為我知道我們新人都是乞丐。" }] },

  // ===== 中文系相愛相殺 =====
  {
    tag: "中文系相愛相殺",
    lines: [
      { who: "麗寶", text: "我好強喔，我講成語了。" },
      { who: "Emmy.W", text: "妳知道妳是中文系畢業的吧？" },
    ],
  },
  { tag: "中文系相愛相殺", lines: [{ who: "Emmy.W", text: "可能因為棒棒糖沒有耳朵，有耳朵才能用成語溝通。" }] },
  {
    tag: "中文系相愛相殺",
    lines: [
      { who: "麗寶", text: "誰跟你投筆從戎，我拿筆就能開戰。" },
      { who: "Emmy.W", text: "殘暴到只剩下語言可以拿來攻擊。" },
    ],
  },
  { tag: "中文系相愛相殺", lines: [{ who: "Emmy.W", text: "妳可以用台大中文語言能力電他嗎？" }] },
  { tag: "中文系相愛相殺", lines: [{ who: "麗寶", text: "我永遠都記得我說我中文系讀到馬桶裡。" }] },
  { tag: "中文系相愛相殺", lines: [{ who: "Emmy.W", text: "身為中文系畢業，對於這公司的人語言閱讀能力低下感到無奈吧。" }] },
  { tag: "中文系相愛相殺", lines: [{ who: "Emmy.W", text: "有沒有可能只是我們數學真的很爛？我們不是故意選文組，是沒有選擇。" }] },

  // ===== 職場毒雞湯 =====
  { tag: "職場毒雞湯", lines: [{ who: "Emmy.W", text: "這跟無名無關，是無能。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "沒能力不要在那邊賣慘。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "沒料就不要吵人。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "Emmy.W", text: "搞笑 = 有做事。笑 = 什麼事都沒做。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "殘酷而無德的野心，永遠不可能走向光明。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "多內耗少遠謀，專業難施展開；經驗徒為空談，專業成掣肘。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "最有空的人話最多。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "老闆都這麼鳥……為什麼這些公司都這麼爛？" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "主管不定時的驚喜任務 = 開民宿。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "不知道要幹嘛不是很好嗎？坐在那邊一天就有錢賺。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "公司本來就是有人比較辛苦、有人比較輕鬆啊。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "如果他有專業態度，就不該在同事面前代替發言。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "要是能重來，我一定一巴掌打醒兩個月前進去上班的我。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "人生 3 萬 6000 天，你不是來人間考試的。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "爛公司人人想走，好公司沒人要走。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "離職日壓一個 12/30……因為他要吃公司年末聚餐。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "職場驅魔師成功讓爛經理走了。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "領 62K 自費去日本可以嗎？" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "不可以領四萬欸，我現在知道薪水為什麼是秘密。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "請他的薪水不如拿去課金買 GPT 高級方案。" }] },
  { tag: "職場毒雞湯", lines: [{ who: "", text: "做事只看得出一個字：懶。有做就好。" }] },

  // ===== 沒禮貌損友告白 =====
  {
    tag: "沒禮貌損友告白",
    lines: [
      { who: "麗寶", text: "我是友誼渣女。" },
      { who: "Emmy.W", text: "真的欸。" },
    ],
  },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "妳的人生充滿各種社死陷阱。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "妳看起來有在聽國語歌嗎？如果有，我檢討，我的問題。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "她知道她自己是垂眼嗎？我說廢話，她會照鏡子。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "麗寶", text: "要怎麼不知道，以為自己是貓眼嗎？那就真的是笑話了。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "妳真的很超級共情仔，妳很需要，我也需要。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "ENFP = 沒禮貌。" }] },
  {
    tag: "沒禮貌損友告白",
    lines: [
      { who: "麗寶", text: "我是個給予者（Gay User）。" },
      { who: "Emmy.W", text: "哈哈哈哈哈哈，對。" },
    ],
  },
  { tag: "沒禮貌損友告白", lines: [{ who: "麗寶", text: "我能量在消逝，跟我臉上的膠原蛋白一樣。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "麗寶", text: "我就是自私，現在已經是我的鬼魂在跟你說話了。" }] },
  { tag: "沒禮貌損友告白", lines: [{ who: "Emmy.W", text: "我知道我跟妳的共同點了，嘲笑別人的幸與不幸。" }] },

  // ===== 促購代言人 =====
  {
    tag: "促購代言人",
    lines: [
      { who: "Emmy.W", text: "妳可能比較適合當貼圖推薦員。" },
      { who: "麗寶", text: "超好笑，妳是有買方案嗎還是妳都是用買的？" },
      { who: "Emmy.W", text: "我跟妳對話到底買了幾組！！我都是買的！！！" },
    ],
  },
  {
    tag: "促購代言人",
    lines: [
      { who: "麗寶", text: "哇哈哈哈哈哈，請 LINE 官方讓我抽成。" },
      { who: "Emmy.W", text: "對！妳需要推薦碼，分潤。" },
    ],
  },
  { tag: "促購代言人", lines: [{ who: "Emmy.W", text: "妳到底是什麼貼圖暴發戶。" }] },
  {
    tag: "促購代言人",
    lines: [
      { who: "Emmy.W", text: "妳好厲害，根本 AI 代言人。" },
      { who: "麗寶", text: "我是 AI 觀察師。" },
    ],
  },
  { tag: "促購代言人", lines: [{ who: "麗寶", text: "我好強，我可以成為下一個 AI 標註師了，兼職。" }] },
  {
    tag: "促購代言人",
    lines: [
      { who: "Emmy.W", text: "醫生說她介紹了一堆人來，至少 4、5 個，以為她是診所業務。" },
      { who: "麗寶", text: "超好笑，代言人。" },
    ],
  },
  { tag: "促購代言人", lines: [{ who: "麗寶", text: "我們的對話完全是 2GB 的喜劇素材。" }] },
  {
    tag: "促購代言人",
    lines: [
      { who: "Emmy.W", text: "我現在覺得文字應該沒什麼力量了，不然我怎麼會要做圖。" },
      { who: "麗寶", text: "對，文字 0，根本沒人要看文字。" },
    ],
  },

  // ===== 顯化魔法 =====
  { tag: "顯化魔法", lines: [{ who: "公告", text: "11月我們都能健康如願，工作目標達成。" }] },
  { tag: "顯化魔法", lines: [{ who: "公告", text: "3/10後我的工作再也跟這些什麼實體展都無關。" }] },
  { tag: "顯化魔法", lines: [{ who: "公告", text: "3/1後愛麗絲不用再碰喜餅大賞，我不用再跟王ㄐㄧ共事任何工作。" }] },
  { tag: "顯化魔法", lines: [{ who: "公告", text: "希望我們 9 月願望一一實現。" }] },
  {
    tag: "顯化魔法",
    lines: [
      { who: "麗寶", text: "我起床了，我真棒。" },
      { who: "Emmy.W", text: "你很棒，給你一個讚。" },
    ],
  },
  { tag: "顯化魔法", lines: [{ who: "Emmy.W", text: "還好你沒有臉朝下，想想你只是膝蓋流血不是流鼻血，妳有沒有安慰很多？" }] },
  { tag: "顯化魔法", lines: [{ who: "Emmy.W", text: "妳很堅強，你值得一個更愛妳的世界。" }] },
  { tag: "顯化魔法", lines: [{ who: "Emmy.W", text: "真的當不成朋友的話也是很可惜，我還是很願意繼續跟妳當朋友。" }] },
  { tag: "顯化魔法", lines: [{ who: "麗寶", text: "希望你的新工作越來越順利……未來也要繼續下班後快樂時光。" }] },

  // ===== 台大生吐槽 =====
  { tag: "台大生吐槽", lines: [{ who: "Emmy.W", text: "台大生都很喜歡把東西丟到什麼桶裡，馬桶、垃圾桶、廚餘桶。" }] },
  { tag: "台大生吐槽", lines: [{ who: "麗寶", text: "後來發現可能是台大男生都很奇怪。" }] },
  { tag: "台大生吐槽", lines: [{ who: "麗寶", text: "58 公斤是我考上台大的代價。" }] },
  { tag: "台大生吐槽", lines: [{ who: "Emmy.W", text: "台大必修選，沒有做一組貼圖不能畢業。" }] },
  { tag: "台大生吐槽", lines: [{ who: "麗寶", text: "台大真的很多智障怪人，很多好笑的怪事。" }] },
  { tag: "台大生吐槽", lines: [{ who: "麗寶", text: "醉月湖的鵝不見，結果是被別人抓去煮來吃。" }] },

  // ===== 神回覆 =====
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "妳問ㄐㄧ：『請問你對面的人只有我看得到嗎？』" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "這整間公司的人都好遮，全宇宙『遮』的總和都在這。" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "這已經不是社群的問題，是智商。" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "他的美學參考你媽，毫無美學可言好嗎。" }] },
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "我看要轉機的機票至少要 10 小時耶……智障。" }] },
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "妳的人生充滿挑戰，妳很像潛入別人家。" }] },
  {
    tag: "神回覆",
    lines: [
      { who: "Emmy.W", text: "低能兒跟喜憨兒是真的有這個病症，可悲兒是啥？" },
      { who: "麗寶", text: "我。" },
    ],
  },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "我是北京人……沒，是跟低能兒一樣概念。" }] },
  {
    tag: "神回覆",
    lines: [
      { who: "Emmy.W", text: "這隻狗越看越像妳。" },
      { who: "麗寶", text: "跟我一樣機掰嗎？" },
    ],
  },
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "我是小丑，我剛才為了 200 元坐在屹耳車上滑。" }] },
  {
    tag: "神回覆",
    lines: [
      { who: "麗寶", text: "是你在吃蛋嗎？" },
      { who: "Emmy.W", text: "不然我是母雞嗎？" },
    ],
  },
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "岡田將生看成博恩……我的眼睛。" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "我明天又要參加泰勒絲趴，完全沒有任何名目，只是亂開趴。" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "妳可以把妳的憤怒寫成一封信，立刻私訊給泰勒絲。" }] },
  { tag: "神回覆", lines: [{ who: "Emmy.W", text: "妳是第二個批評我貼圖的人。" }] },
  { tag: "神回覆", lines: [{ who: "麗寶", text: "900 塊是他的發財金是不是？" }] },

  // ===== 家人語錄 =====
  { tag: "家人語錄", lines: [{ who: "麗寶", text: "我媽（茱莉）：『交換學生都不用讀書喔？』" }] },
  { tag: "家人語錄", lines: [{ who: "Emmy.W", text: "安迪對監視器沒有任何意外的反應……他說阿姨沒有格局。" }] },
  { tag: "家人語錄", lines: [{ who: "麗寶", text: "我快笑死，他直接推導出茱莉的年紀。" }] },
  { tag: "家人語錄", lines: [{ who: "Emmy.W", text: "安迪說妳同學很沒家教。" }] },
  { tag: "家人語錄", lines: [{ who: "Emmy.W", text: "我有愛麗絲，她小我 15 歲，靠她了。" }] },
];

export default function FriendCards() {
  const [current, setCurrent] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState(0);

  const draw = () => {
    if (flipped) {
      setFlipped(false);
      setTimeout(() => {
        pickCard();
      }, 260);
    } else {
      pickCard();
    }
  };

  const pickCard = () => {
    let next;
    do {
      next = CARDS[Math.floor(Math.random() * CARDS.length)];
    } while (CARDS.length > 1 && current && next.lines[0].text === current.lines[0].text);
    setCurrent(next);
    setCount((c) => c + 1);
    requestAnimationFrame(() => setFlipped(true));
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600&family=Noto+Sans+TC:wght@400;500;700&display=swap');

        .fc-scene { perspective: 1400px; }
        .fc-card {
          position: relative;
          width: 300px;
          min-height: 380px;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .fc-card.is-flipped { transform: rotateY(180deg); }
        .fc-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 18px 40px -18px rgba(42, 38, 32, 0.45);
        }
        .fc-face.back {
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 40%),
            radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.4px);
          background-size: auto, 16px 16px;
          background-color: #3E2F39;
        }
        .fc-face.front {
          background: #FFFDF9;
          transform: rotateY(180deg);
          padding: 30px 26px;
          text-align: left;
          overflow-y: auto;
        }
        .fc-btn {
          font-family: 'Noto Sans TC', sans-serif;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .fc-btn:active { transform: scale(0.96); }
      `}</style>

      <div style={styles.header}>
        <div style={styles.eyebrow}>BETWEEN US</div>
        <h1 style={styles.title}>小紙條</h1>
        <p style={styles.subtitle}>每天抽一句，有助一天身心愉快</p>
      </div>

      <div className="fc-scene">
        <div className={`fc-card${flipped ? " is-flipped" : ""}`} onClick={draw}>
          <div className="fc-face back">
            <div style={styles.backMark}>✦</div>
            <div style={styles.backHint}>
              {current ? "點一下，看下一句要電誰" : "點一下，抽一句"}
            </div>
          </div>
          <div className="fc-face front">
            {current?.tag && <div style={styles.tag}>{current.tag}</div>}
            <div style={styles.linesWrap}>
              {current?.lines.map((l, i) => (
                <div key={i} style={styles.lineRow}>
                  {l.who && <div style={styles.who}>{l.who}</div>}
                  <div style={styles.quote}>「{l.text}」</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.meta}>
        {count > 0 ? `第 ${count} 次相遇` : "還沒抽過"}
        <span style={styles.dot}>·</span>
        {`收藏了 ${CARDS.length} 句`}
      </div>

      <button style={styles.button} className="fc-btn" onClick={draw}>
        抽一句
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "560px",
    width: "100%",
    background: "#ECE7DE",
    color: "#2A2620",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 20px",
    fontFamily: "'Noto Sans TC', sans-serif",
    gap: "28px",
  },
  header: { textAlign: "center" },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "3px",
    color: "#B8636F",
    fontWeight: 700,
    marginBottom: "6px",
  },
  title: {
    fontFamily: "'Noto Serif TC', serif",
    fontSize: "30px",
    margin: 0,
    fontWeight: 600,
    letterSpacing: "1px",
  },
  subtitle: { fontSize: "13px", color: "#6B6357", marginTop: "8px" },
  backMark: { color: "#E4B7B0", fontSize: "22px", marginBottom: "12px" },
  backHint: { color: "#D8C7CE", fontSize: "13px", letterSpacing: "1px" },
  tag: {
    alignSelf: "flex-start",
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#B8636F",
    background: "#F6E7E5",
    padding: "3px 10px",
    borderRadius: "999px",
    marginBottom: "16px",
    fontWeight: 500,
  },
  linesWrap: { display: "flex", flexDirection: "column", gap: "14px" },
  lineRow: { display: "flex", flexDirection: "column", gap: "4px" },
  who: { fontSize: "11px", color: "#8B7B6E", letterSpacing: "1px" },
  quote: {
    fontFamily: "'Noto Serif TC', serif",
    fontSize: "17px",
    lineHeight: 1.8,
    color: "#2A2620",
  },
  meta: { fontSize: "12px", color: "#8B8272", letterSpacing: "1px" },
  dot: { margin: "0 8px", color: "#C7BEAF" },
  button: {
    padding: "12px 38px",
    borderRadius: "999px",
    background: "#B8636F",
    color: "#FFFDF9",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "1px",
  },
};
