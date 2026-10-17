"use client";

import { useState } from "react";
import { Map, Library, Swords, ShoppingBag, MessageCircle, UserRound } from "lucide-react";

type Screen = "map" | "quiz" | "reward" | "collection";

type HotspotProps = {
  className: string;
  label: string;
  onClick: () => void;
};

function Hotspot({ className, label, onClick }: HotspotProps) {
  return <button className={`premiumHotspot ${className}`} aria-label={label} onClick={onClick} />;
}

function PremiumBottomNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  const items = [
    { label: "Map", icon: Map, action: () => setScreen("map"), active: screen === "map" },
    { label: "Collection", icon: Library, action: () => setScreen("collection"), active: screen === "collection" },
    { label: "Arena", icon: Swords, action: () => setScreen("quiz"), active: screen === "quiz" },
    { label: "Shop", icon: ShoppingBag, action: () => setScreen("reward"), active: screen === "reward" },
  ];

  return (
    <nav className="premiumBottomNav" aria-label="Main navigation">
      {items.map(({ label, icon: Icon, action, active }) => (
        <button key={label} className={active ? "premiumNavItem active" : "premiumNavItem"} onClick={action}>
          <Icon size={20} strokeWidth={2.7} />
          <span>{label}</span>
        </button>
      ))}
      <a className="premiumNavItem chatItem" href="/chat" aria-label="Open chat">
        <span className="chatDot" />
        <MessageCircle size={20} strokeWidth={2.7} />
        <span>Chat</span>
      </a>
      <button className="premiumNavItem" aria-label="Profile preview">
        <UserRound size={20} strokeWidth={2.7} />
        <span>Profile</span>
      </button>
    </nav>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("map");

  return (
    <main className="premiumAppShell">
      <section className="premiumPhone" aria-label="Quirk Arena mobile preview">
        {screen === "map" && (
          <div className="premiumScreen">
            <img className="premiumArtwork" src="/visual-map.webp" alt="Quirk Arena world map" />
            <Hotspot className="mapQuiz" label="Start quiz" onClick={() => setScreen("quiz")} />
            <Hotspot className="mapBoss" label="Start boss challenge" onClick={() => setScreen("quiz")} />
            <Hotspot className="mapTreasure" label="Open treasure" onClick={() => setScreen("reward")} />
            <Hotspot className="mapChallenge" label="Start challenge" onClick={() => setScreen("quiz")} />
            <Hotspot className="mapPlay" label="Play Paris daily quiz" onClick={() => setScreen("quiz")} />
            <PremiumBottomNav screen={screen} setScreen={setScreen} />
          </div>
        )}

        {screen === "quiz" && (
          <div className="premiumScreen">
            <img className="premiumArtwork" src="/visual-quiz.webp" alt="Quirk Arena Paris landmark quiz" />
            <Hotspot className="quizClose" label="Close quiz" onClick={() => setScreen("map")} />
            <Hotspot className="quizParis" label="Choose Paris" onClick={() => setScreen("reward")} />
            <Hotspot className="quizHint" label="Use hint" onClick={() => undefined} />
            <Hotspot className="quizAd" label="Watch ad for hint" onClick={() => undefined} />
          </div>
        )}

        {screen === "reward" && (
          <div className="premiumScreen">
            <img className="premiumArtwork" src="/visual-reward.webp" alt="Quirk Arena treasure reward" />
            <Hotspot className="rewardClose" label="Close reward" onClick={() => setScreen("map")} />
            <Hotspot className="rewardAwesome" label="Continue to collection" onClick={() => setScreen("collection")} />
          </div>
        )}

        {screen === "collection" && (
          <div className="premiumScreen">
            <img className="premiumArtwork" src="/visual-collection.webp" alt="Quirk Arena country card collection" />
            <Hotspot className="collectionFrance" label="View France card" onClick={() => undefined} />
            <Hotspot className="collectionJapan" label="View Japan card" onClick={() => undefined} />
            <PremiumBottomNav screen={screen} setScreen={setScreen} />
          </div>
        )}
      </section>
      <p className="premiumDesktopHint">Interactive Quirk Arena preview — tap the game buttons and bottom navigation.</p>
    </main>
  );
}
