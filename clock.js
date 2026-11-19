(() => {
    const el = document.getElementById("live-datetime");
    if (!el) return;

    const { dateLocale = "en-US", timeLocale = "en-GB", timezone = "" } = el.dataset;
    const tz = timezone ? { timeZone: timezone } : {};

    const dateFmt = new Intl.DateTimeFormat(dateLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric", ...tz });
    const timeFmt = new Intl.DateTimeFormat(timeLocale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, ...tz });

    let timer;
    const tick = () => {
        const now = new Date();
        el.textContent = `${dateFmt.format(now)} — ${timeFmt.format(now)}`;
        el.dateTime = now.toISOString();
        timer = setTimeout(tick, 1000 - (now.getMilliseconds()));
    };

    document.addEventListener("visibilitychange", () => {
        clearTimeout(timer);
        if (!document.hidden) tick();
    });
    tick();
})();