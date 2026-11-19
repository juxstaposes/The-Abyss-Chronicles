const CHRONICLE_CONTENT = {
    masthead: {
        title: "The Abyssal Chronicle",
        tagline: "Global Security Dispatch",
        edition: "International Edition",
        volume: "Vol. CLXXVI . . . No. 61,042"
    },
    sidebar: [
        {
            id: "iran-conflict",
            topic: "Middle East & Global Markets",
            headline: "U.S.-Iran Military Confrontation Enters New Strategic Phase",
            link: "#iran-full-dispatch",
            linkText: "Read Full Strategic Briefing →",
            image: { src: "image_a75d89.jpg", alt: "Cracked wall depicting flags of Iran and the United States", position: "side" },
            paragraphs: [
                "Direct military hostilities between the United States and Iran commenced on February 28, 2026, following major U.S. and Israeli air strikes that targeted military and nuclear infrastructure and resulted in the death of Supreme Leader Ali Khamenei.",
                "According to defense records as of September 15, 2026, 18 U.S. service members have been killed and 824 wounded during the campaign. While President Donald Trump declared that the conflict is effectively concluded militarily, he emphasized pursuing a \"total victory\" rather than a \"93% victory\" prior to a complete withdrawal. Meanwhile, Iran's capacity to threaten shipping lanes in the Strait continues to directly influence global oil prices, maritime freight costs, and U.S. economic stability."
            ]
        },
        {
            id: "philippines-security",
            topic: "Indo-Pacific Security",
            headline: "Philippines Faces Continuing Armed Conflicts and Rising Maritime Tensions",
            link: "#philippines-full-dispatch",
            linkText: "Explore Regional Analysis →",
            image: { src: "image_a75e0b.jpg", alt: "Philippine Coast Guard vessel approaching BRP Sierra Madre in the West Philippine Sea", position: "bottom" },
            paragraphs: [
                "The Philippines continues to navigate persistent internal armed conflicts alongside escalating territorial disputes with China in the West Philippine Sea. Domestically, government forces remain engaged in a decades-long insurgency against the New People's Army (NPA), with Mindanao still experiencing periodic armed clashes.",
                "Although the Philippines is not formally at war with any sovereign nation, these dual security pressures remain a paramount national concern, requiring sustained government efforts to safeguard citizens and pursue diplomatic resolutions."
            ],
            bullets: [
                "The NPA has sustained decades of armed conflict against state forces.",
                "Isolated skirmishes continue to affect communities across Mindanao.",
                "The West Philippine Sea remains a critical flashpoint over maritime sovereignty.",
                "Filipino fishermen and naval personnel face ongoing operational hazards due to maritime standoffs."
            ]
        }
    ],
    lead: {
        id: "gaza-lead",
        topic: "International Crisis — Lead Report",
        headline: "Israeli Forces Conclude Rare Ground Incursion Beyond Gaza Ceasefire Line",
        columns: true,
        dropCap: true,
        image: {
            src: "image_a75d4b.jpg",
            alt: "Displaced Palestinian families walking with belongings in central Gaza",
            caption: "Families flee neighborhoods near the Nuseirat refugee camp in central Gaza following evacuation orders and artillery strikes.",
            position: "inline",
            after: 2
        },
        paragraphs: [
            "Israeli military forces have completed a rare ground operation inside central Gaza beyond their established zone of control, one day after issuing evacuation orders to local residents. On Wednesday, families fled homes and makeshift shelters as tanks advanced east of the Nuseirat refugee camp and onto Salah al-Din road under the cover of artillery fire.",
            "The Israel Defense Forces (IDF) stated that the joint operation with the Shin Bet security service was designed to dismantle a tunnel west of the \"Yellow Line\"—the boundary demarcating the more than 60 percent of Gaza currently occupied by Israeli forces. Hamas, which governs the remaining territory, condemned the advance and the displacement of an estimated 6,000 civilians as a flagrant violation of the October 2025 ceasefire agreement.",
            "Verified footage from the area captured residents fleeing along Salah al-Din road amid nearby artillery blasts and automatic gunfire, with displaced civilians reporting that they abandoned all personal belongings to escape. Separate Israeli drone strikes on Wednesday killed three individuals in Nuseirat, Gaza City, and Deir al-Balah, which the IDF stated targeted military operatives.",
            "Despite the ceasefire, near-daily strikes have killed at least 1,658 Palestinians and six Israeli soldiers over the past year, bringing the total Palestinian death toll since October 7, 2023, to more than 74,700. Roughly 1.9 million people—90 percent of Gaza's population—remain displaced, while reconstruction of the territory's 82 percent damaged infrastructure remains stalled over disagreements regarding the disarmament of Hamas and the timeline for an Israeli withdrawal."
        ]
    }
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function renderMedia(a) {
    const { image: i } = a;
    if (!i) return "";
    const img = `<span class="media-frame"><img src="${esc(i.src)}" alt="${esc(i.alt || "")}" loading="lazy"></span>`;
    const inner = a.link && i.position !== "inline" ? `<a href="${esc(a.link)}">${img}</a>` : img;
    const cap = i.caption ? `<figcaption class="image-caption">${esc(i.caption)}</figcaption>` : "";
    return `<figure class="media media--${i.position || "side"}">${inner}${cap}</figure>`;
}

function renderArticle(a, { tag = "section", headingTag = "h2", cls = "" } = {}) {
    const pos = a.image?.position;
    const media = renderMedia(a);
    const paras = a.paragraphs.map((t, n) => `<p class="article-body${a.dropCap && n === 0 ? " drop-cap" : ""}">${esc(t)}</p>`);
    if (pos === "inline") paras.splice(a.image.after ?? 1, 0, media);

    const bullets = a.bullets?.length ? `<ul class="editorial-list">${a.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
    const heading = `<${headingTag} class="article-headline">${a.link ? `<a href="${esc(a.link)}">${esc(a.headline)}</a>` : esc(a.headline)}</${headingTag}>`;
    const [first, ...rest] = paras;

    return `<${tag} class="article-card ${cls} has-${pos || "no"}-media" id="${esc(a.id)}">
        <span class="topic-tag">${esc(a.topic)}</span>
        ${heading}
        ${pos === "side" ? media : ""}
        <div class="${a.columns ? "columns" : "text"}">${first}${bullets}${rest.join("")}</div>
        ${a.link && a.linkText ? `<a href="${esc(a.link)}" class="read-more-link">${esc(a.linkText)}</a>` : ""}
        ${pos === "bottom" ? media : ""}
    </${tag}>`;
}

function renderChronicle(data = CHRONICLE_CONTENT) {
    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    set("paper-title", data.masthead.title);
    set("edition-label", data.masthead.edition);
    set("volume-label", data.masthead.volume);
    document.title = `${data.masthead.title} — ${data.masthead.tagline}`;

    document.getElementById("left-articles").innerHTML = data.sidebar.map((a) => renderArticle(a)).join("");
    document.getElementById("gaza-main").innerHTML = renderArticle(data.lead, { tag: "div", cls: "lead" });

    document.querySelectorAll(".media img").forEach((img) => {
        const fail = () => img.closest(".media-frame").classList.add("is-missing");
        img.addEventListener("error", fail);
        if (img.complete && img.naturalWidth === 0) fail();
    });
}

renderChronicle();