const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  try {
    // La configuration automatique de Netlify Blobs échoue sur ce site (probablement lié
    // à sa visibilité "Privée"), donc on fournit explicitement siteID + token.
    const store = getStore({
      name: "sorties",
      siteID: process.env.NETLIFY_SITE_ID || "dcb7e6bd-0199-413a-8e2f-804ff4c051a2",
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });

    if (event.httpMethod === "GET") {
      const data = (await store.get("liste", { type: "json" })) || [];
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === "POST") {
      let payload;
      try {
        payload = JSON.parse(event.body || "{}");
      } catch (e) {
        return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Requête invalide." }) };
      }

      const code = payload.code || "";
      if (!process.env.COMMITTEE_CODE || code !== process.env.COMMITTEE_CODE) {
        return { statusCode: 401, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Code d'accès incorrect." }) };
      }

      const jour = (payload.jour || "").trim();
      const heure = (payload.heure || "").trim();
      const lieu = (payload.lieu || "").trim();
      const type = (payload.type || "").trim();
      const niveau = (payload.niveau || "Tous niveaux").trim();
      const organisateur = (payload.organisateur || "").trim();

      if (!jour || !heure || !lieu || !type) {
        return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Champs obligatoires manquants." }) };
      }

      const current = (await store.get("liste", { type: "json" })) || [];
      current.push({
        id: Date.now().toString(36),
        jour,
        heure,
        lieu,
        type,
        niveau,
        organisateur,
        creeLe: new Date().toISOString(),
      });
      await store.set("liste", JSON.stringify(current));

      return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Méthode non autorisée" }) };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Erreur serveur : " + (err && err.message ? err.message : String(err)) }),
    };
  }
};
