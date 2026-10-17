"use client";

import { useMemo, useState } from "react";
import {
  Map as MapIcon,
  Library,
  Swords,
  ShoppingBag,
  UserRound,
  Gift,
  Heart,
  Coins,
  Lightbulb,
  Play,
  X,
  Check,
  Trophy,
  LockKeyhole,
  Gem,
  Star,
} from "lucide-react";

type Screen = "map" | "quiz" | "reward" | "collection";

type QuizChoice = {
  label: string;
  correct?: boolean;
};

const quizChoices: QuizChoice[] = [
  { label: "Berlin" },
  { label: "Paris", correct: true },
  { label: "Rome" },
  { label: "Madrid" },
];

const cards = [
  { country: "India", rarity: "Common", flag: "🇮🇳", art: "🕌", className: "common" },
  { country: "France", rarity: "Rare", flag: "🇫🇷", art: "🗼", className: "rare" },
  { country: "Japan", rarity: "Epic", flag: "🇯🇵", art: "⛩️", className: "epic" },
  { country: "USA", rarity: "Common", flag: "🇺🇸", art: "🗽", className: "common" },
  { country: "???", rarity: "Legendary", flag: "", art: "?", className: "legendary locked" },
  { country: "???", rarity: "Epic", flag: "", art: "?", className: "epic locked" },
];

function TopBar() {
  return (
    <div className="topbar">
      <div className="avatarWrap">
        <div className="avatar">🧭</div>
        <div className="levelBlock">
          <div className="levelText"><Star size={13} fill="currentColor" /> Lv 12</div>
          <div className="xpTrack"><span /></div>
        </div>
      </div>
      <div className="statPill"><Heart size={16} fill="currentColor" /> 5 <span>+</span></div>
      <div className="statPill coin"><Coins size={16} fill="currentColor" /> 1,250 <span>+</span></div>
    </div>
  );
}

function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  const items = [
    { key: "map" as Screen, label: "Map", icon: MapIcon },
    { key: "collection" as Screen, label: "Collection", icon: Library },
    { key: "quiz" as Screen, label: "Arena", icon: Swords },
    { key: "reward" as Screen, label: "Shop", icon: ShoppingBag },
    { key: "map" as Screen, label: "Profile", icon: UserRound },
  ];

  return (
    <nav className="bottomNav">
      {items.map((item, index) => {
        const Icon = item.icon;
        const active = screen === item.key && (item.label !== "Profile" || screen === "map") && !(screen === "map" && item.label === "Profile");
        return (
          <button key={`${item.label}-${index}`} className={active ? "navItem active" : "navItem"} onClick={() => setScreen(item.key)}>
            <Icon size={19} strokeWidth={2.5} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Pin({ type, label, className, onClick }: { type: "quiz" | "boss" | "treasure" | "challenge"; label: string; className: string; onClick: () => void }) {
  const icon = type === "quiz" ? "🏛️" : type === "boss" ? "👹" : type === "treasure" ? "🎁" : "🏁";
  return (
    <button className={`mapPin ${type} ${className}`} onClick={onClick}>
      <span className="pinIcon">{icon}</span>
      <strong>{label}</strong>
    </button>
  );
}

function WorldMap({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <div className="mapScreen screen">
      <TopBar />
      <button className="dailyBadge"><Gift size={17} /> <span>Daily<br/>Reward</span><i /></button>

      <div className="worldMap" aria-label="stylized world map">
        <div className="cloud c1" /><div className="cloud c2" /><div className="cloud c3" />
        <div className="continent northAmerica" />
        <div className="continent southAmerica" />
        <div className="continent europe" />
        <div className="continent africa" />
        <div className="continent asia" />
        <div className="continent australia" />
        <div className="volcano">🌋</div>
        <div className="boat">⛵</div>
        <Pin type="quiz" label="Quiz" className="pinQuiz" onClick={() => setScreen("quiz")} />
        <Pin type="boss" label="Boss" className="pinBoss" onClick={() => setScreen("quiz")} />
        <Pin type="treasure" label="Treasure" className="pinTreasure" onClick={() => setScreen("reward")} />
        <Pin type="challenge" label="Challenge" className="pinChallenge" onClick={() => setScreen("quiz")} />
      </div>

      <div className="dailyCard">
        <div className="dailyThumb">🗼</div>
        <div className="dailyCopy">
          <small>🎁 Daily Reward ready</small>
          <strong>Paris Quiz · 5 questions</strong>
        </div>
        <button onClick={() => setScreen("quiz")}>PLAY <Play size={15} fill="currentColor" /></button>
      </div>

      <BottomNav screen="map" setScreen={setScreen} />
    </div>
  );
}

function QuizScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = selected === "Paris";

  return (
    <div className="quizScreen screen">
      <TopBar />
      <div className="quizHead">
        <button className="closeButton" onClick={() => setScreen("map")}><X size={21} /></button>
        <div className="questionProgress"><strong>3/5</strong><div><span /><span /><i /><i /><i /></div></div>
        <div className="timer">15</div>
      </div>

      <div className="landmarkCard">
        <div className="eiffelScene">
          <div className="sunGlow" />
          <div className="eiffel">🗼</div>
          <div className="treeRow">🌳🌳🌳🌳🌳</div>
        </div>
      </div>

      <h2 className="questionTitle">Which city is this landmark in?</h2>
      <div className="answers">
        {quizChoices.map((choice) => {
          const isSelected = selected === choice.label;
          const cls = isSelected ? (choice.correct ? "answer selected correct" : "answer selected wrong") : "answer";
          return (
            <button key={choice.label} className={cls} onClick={() => setSelected(choice.label)}>
              <span className="radio">{isSelected && choice.correct ? <Check size={18} /> : ""}</span>
              {choice.label}
            </button>
          );
        })}
      </div>

      <div className="quizActions">
        <button className="hintBtn"><Lightbulb size={19} fill="currentColor" /> Hint x3</button>
        <button className="adBtn"><Play size={18} fill="currentColor" /> Watch ad to<br/>revive</button>
      </div>

      {selected && (
        <button className={correct ? "continueBtn visible" : "continueBtn visible wrongCta"} onClick={() => correct ? setScreen("reward") : setSelected(null)}>
          {correct ? "Great! Claim reward" : "Try again"}
        </button>
      )}
    </div>
  );
}

function RewardScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <div className="rewardScreen screen">
      <button className="closeButton rewardClose" onClick={() => setScreen("map")}><X size={21} /></button>
      <div className="rewardBurst" />
      <h1>Treasure<br/>Chest!</h1>
      <div className="chestWrap">
        <div className="chestGlow" />
        <div className="chest">🧰</div>
        <div className="coinSpark s1">●</div><div className="coinSpark s2">●</div><div className="coinSpark s3">●</div>
      </div>
      <div className="rewardItems">
        <div><Coins size={35} fill="currentColor" /><strong>+100 Coins</strong></div>
        <div><Gem size={35} fill="currentColor" /><strong>+1 Gem</strong></div>
        <div><span className="miniCard">🇯🇵</span><strong>Rare Card:<br/>Japan</strong></div>
      </div>
      <button className="awesomeBtn" onClick={() => setScreen("collection")}>Awesome!</button>
    </div>
  );
}

function CollectionScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const filters = ["All", "Common", "Rare", "Epic", "Legendary"];
  const [filter, setFilter] = useState("All");
  const shownCards = useMemo(() => cards.filter((card) => filter === "All" || card.rarity === filter), [filter]);

  return (
    <div className="collectionScreen screen">
      <TopBar />
      <div className="collectionTitle">
        <div className="stackedCards">🌍</div>
        <div><h1>Your Cards</h1><strong>12 / 195</strong></div>
        <div className="completeMeter"><span><Gift size={18} /> 6%</span><small>Complete</small></div>
      </div>
      <div className="filters">
        {filters.map((name) => <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>)}
      </div>
      <div className="cardGrid">
        {shownCards.map((card, index) => (
          <div className={`countryCard ${card.className}`} key={`${card.country}-${index}`}>
            <span className="rarity">{card.rarity}</span>
            <div className="cardArt">{card.className.includes("locked") ? <LockKeyhole size={44} /> : card.art}</div>
            <div className="cardCountry"><span>{card.flag}</span>{card.country}</div>
          </div>
        ))}
      </div>
      <BottomNav screen="collection" setScreen={setScreen} />
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("map");

  return (
    <main className="appShell">
      <div className="phoneFrame">
        <div className="statusBar"><span>9:41</span><span>▮▮▮  WiFi  🔋</span></div>
        {screen === "map" && <WorldMap setScreen={setScreen} />}
        {screen === "quiz" && <QuizScreen setScreen={setScreen} />}
        {screen === "reward" && <RewardScreen setScreen={setScreen} />}
        {screen === "collection" && <CollectionScreen setScreen={setScreen} />}
        <div className="homeIndicator" />
      </div>
      <div className="previewHint">Tap the map pins, answers and bottom navigation to preview the app.</div>
    </main>
  );
}
