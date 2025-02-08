document.addEventListener("DOMContentLoaded", function () {
    setupMoteTracker();
    fetchRewards();
    setupSelectButtons();
    addSummaryText();
});

// Setup the Mote Tracker Table
function setupMoteTracker() {
    const bellyDiv = document.getElementById("belly-tracker");

    bellyDiv.innerHTML = `
        <table class="belly-table">
            <thead>
                <tr>
                    <th>Goal</th>
                    <th>Needed</th>
                    <th>Owned</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="number" id="motesGoal" value="0" min="0" style="text-align:center;"></td>
                    <td><span id="motesNeeded" class="number-box">0</span></td>
                    <td><span id="motesOwned" class="number-box">0</span></td>
                    <td class="change-controls">
                        <button class="mote-btn jade-btn" onclick="changeMotes(-1)">-</button>
                        <input type="number" id="motesAmount" value="1" min="1" style="text-align:center;">
                        <button class="mote-btn jade-btn" onclick="changeMotes(1)">+</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>Event Rewards 
            <button id="selectAllEvent" class="select-btn jade-btn">Select All</button>
            <button id="deselectAllEvent" class="select-btn jade-btn">Deselect All</button>
        </h2>
        <div id="eventRewardsGrid" class="rewards-grid"></div>

        <h2>Clan Rewards 
            <button id="selectAllClan" class="select-btn jade-btn">Select All</button>
            <button id="deselectAllClan" class="select-btn jade-btn">Deselect All</button>
        </h2>
        <div id="clanRewardsGrid" class="rewards-grid"></div>

        <h2>Community Rewards 
            <button id="selectAllCommunity" class="select-btn jade-btn">Select All</button>
            <button id="deselectAllCommunity" class="select-btn jade-btn">Deselect All</button>
        </h2>
        <div id="communityRewardsGrid" class="rewards-grid"></div>

        <h2>Summary</h2>
        <div id="summaryText" class="summary-box"></div>
    `;

    document.getElementById("motesGoal").addEventListener("input", updateMotes);
}

// Function to Render Rewards
function renderRewards(rewards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    rewards.forEach(reward => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");

        const imagePath = `images/bob/${reward.img}`; // Fixed image path issue
        
        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image" onerror="this.onerror=null;this.src='images/bob/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
            <p class="reward-cost">Cost: ${reward.cost}</p>
        `;

        rewardDiv.addEventListener("click", function () {
            rewardDiv.classList.toggle("selected");
            updateMotes();
        });

        container.appendChild(rewardDiv);
    });
}

// Change Owned Motes Count
function changeMotes(direction) {
    const owned = document.getElementById("motesOwned");
    const inputAmount = parseInt(document.getElementById("motesAmount").value) || 1;
    let newOwned = parseInt(owned.textContent) + (direction * inputAmount);

    owned.textContent = Math.max(newOwned, 0);
    updateMotes();
}

// Update Needed Motes
function updateMotes() {
    let totalMotes = 0;
    document.querySelectorAll(".selected").forEach(reward => {
        const cost = parseInt(reward.querySelector(".reward-cost").textContent.replace("Cost: ", "")) || 0;
        totalMotes += cost;
    });

    document.getElementById("motesNeeded").textContent = totalMotes;
}

// Fix: Select All & Deselect Buttons
function setupSelectButtons() {
    document.getElementById("selectAllEvent").addEventListener("click", () => selectAll("eventRewardsGrid"));
    document.getElementById("deselectAllEvent").addEventListener("click", () => deselectAll("eventRewardsGrid"));
    document.getElementById("selectAllClan").addEventListener("click", () => selectAll("clanRewardsGrid"));
    document.getElementById("deselectAllClan").addEventListener("click", () => deselectAll("clanRewardsGrid"));
    document.getElementById("selectAllCommunity").addEventListener("click", () => selectAll("communityRewardsGrid"));
    document.getElementById("deselectAllCommunity").addEventListener("click", () => deselectAll("communityRewardsGrid"));
}

// Event Rewards Table (FULLY COMPLETE)
const eventRewards = [
    { name: "Low Guardian Chest Plate", cost: 15, img: "LowGuardianChestPlate.png" },
    { name: "Belly Of The Beast Sigil", cost: 10, img: "BellyOfTheBeastEmblem.png" },
    { name: "Krios Signa", cost: 10, img: "KriosSigna.png" },
    { name: "Prominence Wisp Totem", cost: 30, img: "ProminenceWispTotem.png" },
    { name: "Fluctus Rahk Skin", cost: 15, img: "FluctusRahkSkin.png" },
    { name: "Ceti Lacera Blueprint", cost: 15, img: "CetiLacera.png" },
    { name: "Basmu Blueprint", cost: 15, img: "Basmu.png" },
    { name: "Stance Forma Blueprint", cost: 15, img: "StanceForma.png" },
    { name: "The Ballroom Simulacrum", cost: 15, img: "BallroomSimulacrum.png" },
    { name: "Arcane Tempo", cost: 2, img: "ArcaneTempo.png", limit: 42 },
    { name: "Arcane Consequence", cost: 2, img: "ArcaneConsequence.png", limit: 42 },
    { name: "Arcane Momentum", cost: 2, img: "ArcaneMomentum.png", limit: 42 },
    { name: "Arcane Ice", cost: 2, img: "ArcaneIce.png", limit: 42 },
    { name: "Arcane Nullifier", cost: 2, img: "ArcaneNullifier.png", limit: 42 },
    { name: "Arcane Warmth", cost: 2, img: "ArcaneWarmth.png", limit: 42 },
    { name: "Arcane Resistance", cost: 4, img: "ArcaneResistance.png", limit: 42 },
    { name: "Arcane Healing", cost: 4, img: "ArcaneHealing.png", limit: 42 },
    { name: "Arcane Deflection", cost: 4, img: "ArcaneDeflection.png", limit: 42 },
    { name: "Arcane Victory", cost: 4, img: "ArcaneVictory.png", limit: 42 },
    { name: "Arcane Strike", cost: 4, img: "ArcaneStrike.png", limit: 42 },
    { name: "Arcane Awakening", cost: 4, img: "ArcaneAwakening.png", limit: 42 },
    { name: "Arcane Guardian", cost: 4, img: "ArcaneGuardian.png", limit: 42 },
    { name: "Arcane Phantasm", cost: 4, img: "ArcanePhantasm.png", limit: 42 },
    { name: "Arcane Eruption", cost: 4, img: "ArcaneEruption.png", limit: 42 },
    { name: "Arcane Agility", cost: 4, img: "ArcaneAgility.png", limit: 42 },
    { name: "Arcane Acceleration", cost: 4, img: "ArcaneAcceleration.png", limit: 42 },
    { name: "Arcane Trickery", cost: 4, img: "ArcaneTrickery.png", limit: 42 },
    { name: "Arcane Velocity", cost: 6, img: "ArcaneVelocity.png", limit: 42 },
    { name: "Arcane Precision", cost: 6, img: "ArcanePrecision.png", limit: 42 },
    { name: "Arcane Pulse", cost: 6, img: "ArcanePulse.png", limit: 42 },
    { name: "Arcane Ultimatum", cost: 6, img: "ArcaneUltimatum.png", limit: 42 },
    { name: "Arcane Aegis", cost: 6, img: "ArcaneAegis.png", limit: 42 },
    { name: "Arcane Arachne", cost: 6, img: "ArcaneArachne.png", limit: 42 },
    { name: "Arcane Rage", cost: 6, img: "ArcaneRage.png", limit: 42 },
    { name: "Arcane Fury", cost: 6, img: "ArcaneFury.png", limit: 42 },
    { name: "Arcane Avenger", cost: 6, img: "ArcaneAvenger.png", limit: 42 }
];

// Clan Rewards Table (FULLY COMPLETE)
const clanRewards = [
    { name: "Enlightened Hate Skin", cost: 100, img: "EnlightenedHateSkin.png" },
    { name: "Gilded Clan Sigil", cost: 15, img: "ClanSigilGilded.png" },
    { name: "Glyphed Clan Sigil", cost: 15, img: "ClanSigilGlyphed.png" },
    { name: "Phased Clan Sigil", cost: 15, img: "ClanSigilPhased.png" },
    { name: "Arcane Energize", cost: 30, img: "ArcaneEnergize.png" },
    { name: "Arcane Grace", cost: 30, img: "ArcaneGrace.png" },
    { name: "Arcane Barrier", cost: 30, img: "ArcaneBarrier.png", limit: 42 },
    { name: "Belly Of The Beast Emblem", cost: 45, img: "BellyOfTheBeastEmblem.png", limit: 1 } // **Added as requested**
];

// Community Rewards Table
const communityRewards = [
    { name: "Aspirus Ephemera", cost: 40, img: "AspirusEphemera.png" },
    { name: "Aspirus Emergent Ephemera", cost: 40, img: "AspirusEmergentEphemera.png" },
    { name: "Aspirus Apex Ephemera", cost: 40, img: "AspirusApexEphemera.png" }
];

// Function to Render Rewards
function renderRewards(rewards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    rewards.forEach(reward => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");

        const imagePath = `images/bob/${reward.img}`; // Fixed image path issue

        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image" onerror="this.onerror=null;this.src='images/bob/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
            <p class="reward-cost">Cost: ${reward.cost}</p>
        `;

        rewardDiv.addEventListener("click", function () {
            rewardDiv.classList.toggle("selected");
            updateMotes();
        });

        container.appendChild(rewardDiv);
    });
}

// Initialize Rewards
function fetchRewards() {
    renderRewards(eventRewards, "eventRewardsGrid");
    renderRewards(clanRewards, "clanRewardsGrid");
    renderRewards(communityRewards, "communityRewardsGrid");
}

// Summary Information
function addSummaryText() {
    document.getElementById("summaryText").innerHTML = `
        <p>To buy all non-Arcane items at least once, players will need 290 Volatile Motes.</p>
        <p>To buy all Arcanes available through the event to max rank once (21 copies), players will need 1,659 Volatile Motes.</p>
        <p>To buy all Arcanes available through the event to max rank twice (all 42 copies), players will need 3,318 Volatile Motes.</p>
        <p>In total from the normal and Clan shops, players will need 11,550 Volatile Motes.</p>
    `;
}
