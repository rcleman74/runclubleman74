const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const store = getStore("sorties");

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
      return { statusCode: 400, body: JSON.stringify({ error: "Requête invalide." }) };
    }

    const code = payload.code || "";
    if (!process.env.COMMITTEE_CODE || code !== process.env.COMMITTEE_CODE) {
      return { statusCode: 401, body: JSON.stringify({ error: "Code d'accès incorrect." }) };
    }

    const jour = (payload.jour || "").trim();
    const heure = (payload.heure || "").trim();
    const lieu = (payload.lieu || "").trim();
    const type = (payload.type || "").trim();
    const niveau = (payload.niveau || "Tous niveaux").trim();
    const organisateur = (payload.organisateur || "").trim();

    if (!jour || !heure || !lieu || !type) {
      return { statusCode: 400, body: JSON.stringify({ error: "Champs obligatoires manquants." }) };
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

  return { statusCode: 405, body: "Méthode non autorisée" };
};
