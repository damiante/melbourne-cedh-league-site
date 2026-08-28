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

  function renderContact(data) {
    const root = document.getElementById("contact-content");
    if (!root) return;
    root.innerHTML = "";
    const contact = data || {};
    const block = el("div", { className: "about-block" });
    block.appendChild(el("h3", { text: contact.heading || "" }));
    if (contact.body) block.appendChild(el("p", { text: contact.body.trim() }));
    if (contact.email) {
      const link = el("a", { className: "contact-link", text: contact.email });
      link.href = "mailto:" + contact.email;
      block.appendChild(link);
    }
    root.appendChild(block);
  }

  function renderSessions(data) {
    const root = document.getElementById("sessions-list");
    if (!root) return;
    root.innerHTML = "";
    const sessions = (data && data.sessions) || [];
    sessions.forEach(function (session) {
      const row = el("li", { className: "session-row" });

      const when = el("div", { className: "session-when" });
      if (session.time) when.appendChild(el("p", { className: "session-time", text: session.time }));
      row.appendChild(when);

      const body = el("div", { className: "session-body" });
      body.appendChild(el("h3", { text: session.title || "" }));
      if (session.description) {
        body.appendChild(el("p", { text: session.description.trim() }));
      }

      const location = session.location || {};
      const address = session.address || {};
      if (location.name || address.text) {
        const venue = el("p", { className: "session-venue" });
        if (location.name) {
          const locLink = el("a", { text: location.name });
          if (location.url) {
            locLink.href = location.url;
            locLink.target = "_blank";
            locLink.rel = "noopener noreferrer";
          }
          venue.appendChild(locLink);
        }
        if (address.text) {
          if (venue.hasChildNodes()) venue.appendChild(document.createTextNode(" · "));
          const addrLink = el("a", { text: address.text });
          if (address.url) {
            addrLink.href = address.url;
            addrLink.target = "_blank";
            addrLink.rel = "noopener noreferrer";
          }
          venue.appendChild(addrLink);
        }
        body.appendChild(venue);
      }

      row.appendChild(body);

      if (session.discord_url) {
        const link = el("a", { className: "btn btn-primary", text: session.cta_label || "Open in Discord" });
        link.href = session.discord_url;
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
  if (document.getElementById("about-content") || document.getElementById("contact-content") || document.getElementById("sessions-list")) {
    tasks.push(
      fetchYaml("content/description.yaml").then(renderAbout),
      fetchYaml("content/contact.yaml").then(renderContact),
      fetchYaml("content/sessions.yaml").then(renderSessions)
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
    showError("contact-content", "Couldn't load content — check the console.");
    showError("sessions-list", "Couldn't load content — check the console.");
    showError("primer-content", "Couldn't load content — check the console.");
    showError("faq-list", "Couldn't load content — check the console.");
    showError("doc-content", "Couldn't load content — check the console.");
  });
})();
