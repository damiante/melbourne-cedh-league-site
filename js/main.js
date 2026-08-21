(function () {
  "use strict";

  function el(tag, opts) {
    const node = document.createElement(tag);
    opts = opts || {};
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    return node;
  }

  function fetchYaml(path) {
    return fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + path + ": " + res.status);
        return res.text();
      })
      .then(function (text) {
        return jsyaml.load(text);
      });
  }

  function renderAbout(data) {
    const root = document.getElementById("about-content");
    if (!root) return;
    root.innerHTML = "";
    const sections = (data && data.sections) || [];
    sections.forEach(function (section) {
      const block = el("div", { className: "about-block" });
      block.appendChild(el("h3", { text: section.title || "" }));
      block.appendChild(el("p", { text: section.body || "" }));
      root.appendChild(block);
    });
  }

  function renderOrganisers(data) {
    const root = document.getElementById("organisers-list");
    if (!root) return;
    root.innerHTML = "";
    const organisers = (data && data.organisers) || [];
    organisers.forEach(function (person) {
      const card = el("li", { className: "roster-card" });
      const initial = (person.name || "?").trim().charAt(0).toUpperCase();
      card.appendChild(el("span", { className: "roster-monogram", text: initial }));
      card.appendChild(el("h3", { text: person.name || "" }));
      if (person.role) {
        card.appendChild(el("p", { className: "roster-role", text: person.role }));
      }
      card.appendChild(el("p", { className: "roster-handle", text: person.discord_handle || "" }));
      if (person.discord_url) {
        const link = el("a", { className: "roster-link", text: "Message on Discord →" });
        link.href = person.discord_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);
      }
      root.appendChild(card);
    });
  }

  function renderEvents(data) {
    const root = document.getElementById("events-list");
    if (!root) return;
    root.innerHTML = "";
    const events = (data && data.events) || [];
    events.forEach(function (event) {
      const row = el("li", { className: "schedule-row" });

      const when = el("div", { className: "schedule-when" });
      if (event.date) when.appendChild(el("p", { className: "schedule-date", text: event.date }));
      if (event.venue) when.appendChild(el("p", { className: "schedule-venue", text: event.venue }));
      row.appendChild(when);

      const body = el("div", { className: "schedule-body" });
      body.appendChild(el("h3", { text: event.title || "" }));
      if (event.description) {
        body.appendChild(el("p", { text: event.description.trim() }));
      }
      row.appendChild(body);

      if (event.discord_url) {
        const link = el("a", { className: "btn btn-primary", text: event.cta_label || "Open in Discord" });
        link.href = event.discord_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        row.appendChild(link);
      }

      root.appendChild(row);
    });
  }

  function renderPrimer(data) {
    const root = document.getElementById("primer-content");
    if (!root) return;
    root.innerHTML = "";
    const primer = (data && data.primer) || [];
    primer.forEach(function (block) {
      const node = el("div", { className: "primer-block" });
      node.appendChild(el("h3", { text: block.title || "" }));
      node.appendChild(el("p", { text: block.body || "" }));
      root.appendChild(node);
    });
  }

  function renderFaq(data) {
    const root = document.getElementById("faq-list");
    if (!root) return;
    root.innerHTML = "";
    const faq = (data && data.faq) || [];
    faq.forEach(function (item) {
      const details = el("details", { className: "faq-item" });
      const summary = el("summary", { text: item.question || "" });
      const answer = el("p", { text: item.answer || "" });
      details.appendChild(summary);
      details.appendChild(answer);
      root.appendChild(details);
    });
  }

  function renderDoc(data) {
    const root = document.getElementById("doc-content");
    if (!root) return;
    root.innerHTML = "";
    const doc = (data && data.doc) || {};
    const callout = el("div", { className: "doc-callout" });
    if (doc.note) callout.appendChild(el("p", { text: doc.note }));
    if (doc.url) {
      const link = el("a", { className: "btn btn-primary", text: doc.label || "Open the rules doc" });
      link.href = doc.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      callout.appendChild(link);
    }
    root.appendChild(callout);
  }

  function showError(containerId, message) {
    const root = document.getElementById(containerId);
    if (root) root.innerHTML = '<p class="loading">' + message + "</p>";
  }

  const tasks = [];
  if (document.getElementById("about-content") || document.getElementById("organisers-list") || document.getElementById("events-list")) {
    tasks.push(
      fetchYaml("content/description.yaml").then(renderAbout),
      fetchYaml("content/organisers.yaml").then(renderOrganisers),
      fetchYaml("content/events.yaml").then(renderEvents)
    );
  }
  if (document.getElementById("primer-content") || document.getElementById("faq-list") || document.getElementById("doc-content")) {
    tasks.push(
      fetchYaml("content/more-info.yaml").then(function (data) {
        renderPrimer(data);
        renderFaq(data);
        renderDoc(data);
      })
    );
  }

  Promise.all(tasks).catch(function (err) {
    console.error(err);
    showError("about-content", "Couldn't load content — check the console.");
    showError("organisers-list", "Couldn't load content — check the console.");
    showError("events-list", "Couldn't load content — check the console.");
    showError("primer-content", "Couldn't load content — check the console.");
    showError("faq-list", "Couldn't load content — check the console.");
    showError("doc-content", "Couldn't load content — check the console.");
  });
})();
