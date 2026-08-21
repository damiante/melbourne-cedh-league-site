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
    root.innerHTML = "";
    const organisers = (data && data.organisers) || [];
    organisers.forEach(function (person) {
      const card = el("li", { className: "card" });
      card.appendChild(el("h3", { text: person.name || "" }));
      card.appendChild(el("p", { className: "handle", text: person.discord_handle || "" }));
      if (person.discord_url) {
        const link = el("a", { className: "card-link", text: "Message on Discord →" });
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
    root.innerHTML = "";
    const events = (data && data.events) || [];
    events.forEach(function (event) {
      const card = el("li", { className: "card" });
      card.appendChild(el("h3", { text: event.title || "" }));
      if (event.description) {
        card.appendChild(el("p", { text: event.description.trim() }));
      }
      if (event.discord_url) {
        const link = el("a", { className: "btn btn-primary", text: event.cta_label || "Open in Discord" });
        link.href = event.discord_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);
      }
      root.appendChild(card);
    });
  }

  function showError(containerId, message) {
    const root = document.getElementById(containerId);
    if (root) root.innerHTML = '<li class="loading">' + message + "</li>";
  }

  Promise.all([
    fetchYaml("content/description.yaml").then(renderAbout),
    fetchYaml("content/organisers.yaml").then(renderOrganisers),
    fetchYaml("content/events.yaml").then(renderEvents),
  ]).catch(function (err) {
    console.error(err);
    showError("organisers-list", "Couldn't load content — check the console.");
    showError("events-list", "Couldn't load content — check the console.");
  });
})();
