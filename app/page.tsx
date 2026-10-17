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
  LockKeyhole,
  Gem,
  Star,
  MessageCircle,
} from "lucide-react";

type Screen = "map" | "quiz" | "reward" | "collection";

type QuizChoice = { label: string; correct?: boolean };

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
    { key: "chat", label: "Chat", icon: MessageCircle, href: "/chat" },
    { key: "profile", label: "Profile", icon: UserRound },
  ];

  return (
    <nav className="bottomNav">
      {items.map((item, index) => {
        const Icon = item.icon;
        if (item.href) {
          return (
            <a key={`${item.label}-${index}`} className="navItem" href={item.href} aria-label="Open chat">
              <Icon size={19} strokeWidth={2.5} />
              <span>{item.label}</span>
            </a>
          );
        }
        const active = item.key === screen;
        return (
          <button
            key={`${item.label}-${index}`}
            className={active ? "navItem active" : "navItem"}
            onClick={() => item.key === "profile" ? undefined : setScreen(item.key as Screen)}
          >
            <Icon size={19} strokeWidth={2.5} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Pin({ type, label, className, onClick }: { type: "quiz" | "boss" | "treasure" | "challenge"; label: string; className: string; onClick: () => void }) {
  const icon = type === "quiz" ? "🏛️" : type === "boss" ? "☠" : type === "treasure" ? "▣" : "⚑";
  return (
    <button className={`mapPin ${type} ${className}`} onClick={onClick}>
      <span className="pinIcon"><b>{icon}</b></span>
      <strong>{label}</strong>
    </button>
  );
}

function WorldMap({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <div className="mapScreen screen">
      <TopBar />
      <button className="dailyBadge"><Gift size={17} /> <span>Daily<br/>Reward</span><i /></button>

      <div className="worldMap">
        <img src="/quirk-world-map.svg" alt="Quirk Arena illustrated world map" className="mapArtwork" />
        <Pin type="quiz" label="Quiz" className="pinQuiz" onClick={() => setScreen("quiz")} />
        <Pin type="boss" label="Boss" className="pinBoss" onClick={() => setScreen("quiz")} />
        <Pin type="treasure" label="Treasure" className="pinTreasure" onClick={() => setScreen("reward")} />
        <Pin type="challenge" label="Challenge" className="pinChallenge" onClick={() => setScreen("quiz")} />
      </div>

      <div className="dailyCard">
        <div className="dailyThumb"><img src="/quirk-eiffel.svg" alt="Paris challenge" /></div>
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
  const [selected, setSelected] = useState<string | null>("Paris");
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
        <img src="/quirk-eiffel.svg" alt="Eiffel Tower in Paris" />
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

      {selected && !correct && <button className="continueBtn visible wrongCta" onClick={() => setSelected(null)}>Try again</button>}
      {selected && correct && <button className="continueBtn visible" onClick={() => setScreen("reward")}>Claim reward</button>}
    </div>
  );
}

function RewardScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <div className="rewardScreen screen">
      <button className="closeButton rewardClose" onClick={() => setScreen("map")}><X size={21} /></button>
      <h1>Treasure<br/>Chest!</h1>
      <div className="chestWrap"><img src="/quirk-chest.svg" alt="Treasure chest full of Quirk Arena rewards" /></div>
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
        <div className="completeMeter"><span>🎁 6%</span><small>Complete</small></div>
      </div>
      <div className="filters">
        {filters.map((name) => <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>)}
      </div>
      <div className="cardGrid">
        {shownCards.map((card, index) => (
          <button className={`countryCard ${card.className}`} key={`${card.country}-${index}`}>
            <span className="rarity">{card.rarity}</span>
            <div className="cardArt">{card.className.includes("locked") ? <LockKeyhole size={44} /> : card.art}</div>
            <div className="cardCountry"><span>{card.flag}</span>{card.country}</div>
          </button>
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
        <div className="statusBar"><span>9:41</span><span>▮▮▮ &nbsp;⌁&nbsp; <b>100</b></span></div>
        {screen === "map" && <WorldMap setScreen={setScreen} />}
        {screen === "quiz" && <QuizScreen setScreen={setScreen} />}
        {screen === "reward" && <RewardScreen setScreen={setScreen} />}
        {screen === "collection" && <CollectionScreen setScreen={setScreen} />}
        <div className="homeIndicator" />
      </div>
      <div className="previewHint">Interactive mobile preview · tap pins, answers, rewards, collection and chat.</div>
    </main>
  );
}
