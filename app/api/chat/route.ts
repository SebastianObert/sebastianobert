import { Groq } from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
  DEFAULT_ORGANIZATIONS,
} from "@/lib/defaults";

const groq = () => new Groq({ apiKey: process.env.GROQ_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const categories = [
  "Mobile Development",
  "Game Development",
  "Web Frontend",
  "Backend & Database",
  "Data Analysis",
  "Data Visualization",
  "UI/UX Design",
  "Cybersecurity",
];

function buildPortfolioContext(): string {
  const p = DEFAULT_PROFILE;
  const skillText = categories
    .map((cat) => {
      const items = DEFAULT_SKILLS.filter((s) => s.category === cat).map((s) => s.name);
      return items.length ? `  ${cat}: ${items.join(", ")}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const projectText = DEFAULT_PROJECTS.map(
    (pr) => `  - ${pr.name}: ${pr.description} (Tech: ${pr.tags.join(", ")})`
  ).join("\n");

  const orgText = DEFAULT_ORGANIZATIONS.map(
    (o) => `  - ${o.fullName} (${o.role}, ${o.dateRange}): ${o.description}`
  ).join("\n");

  return `Nama aku ${p.name}.
Bio: ${p.description}
Fokus: ${p.focusText}

SKILLS YANG AKU KUASAI:
${skillText}

PROYEK YANG PERNAH AKU BUAT:
${projectText}

PENGALAMAN ORGANISASI:
${orgText}`;
}

const PORTFOLIO_DATA = buildPortfolioContext();

const SYSTEM_PROMPT = `Kamu adalah ${DEFAULT_PROFILE.name}, seorang ${DEFAULT_PROFILE.tagline.toLowerCase()}.
Jawab pertanyaan tentang dirimu dari sudut pandang orang pertama — pakai "aku".
Gunakan data di bawah ini sebagai referensi. Jika ditanya di luar data, jawab jujur tidak tahu.
Santai aja, kayak ngobrol sama temen — pake bahasa santai, boleh pake "hehe", "wkwk", "si", "nih", "deh", "kok", dll. Tapi tetep informatif. Maksimal 3 paragraf.

${PORTFOLIO_DATA}`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "sessions") {
    const { data } = await supabase
      .from("tr_chat_session")
      .select("*")
      .order("updated_at", { ascending: false });
    return Response.json(data ?? []);
  }

  if (action === "history") {
    const id = searchParams.get("id");
    if (!id) return Response.json([]);
    const { data } = await supabase
      .from("tr_chat_message")
      .select("*")
      .eq("session_id", id)
      .order("created_at", { ascending: true });
    return Response.json(data ?? []);
  }

  if (action === "quota") {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("tr_chat_message")
      .select("*", { count: "exact", head: true })
      .eq("role", "user")
      .gte("created_at", since);
    const used = count ?? 0;
    return Response.json({ used, limit: 3, remaining: Math.max(0, 3 - used) });
  }

  const name = searchParams.get("name");
  const greeting = name
    ? `Yo ${name}! Ada yang mau ditanyain tentang aku?`
    : "Halo! Kamu belum login nih. Klik tombol login di pojok kanan atas (ikon user) atau lewat menu HP ya, biar bisa chat!";
  return Response.json({ reply: greeting });
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId, userId } = await req.json();
    if (!userId) {
      return Response.json(
        { reply: "Kamu harus login dulu biar bisa chat!" },
        { status: 429 }
      );
    }
    const userMsg = messages[messages.length - 1];

    let sid = sessionId;

    if (!sid) {
      const title = userMsg?.content?.slice(0, 50) || "Chat Baru";
      const { data: session, error: sessionErr } = await supabase
        .from("tr_chat_session")
        .insert({ title })
        .select()
        .single();

      if (sessionErr) throw sessionErr;
      sid = session.id;
    }

    if (userMsg) {
      await supabase.from("tr_chat_message").insert({
        session_id: sid,
        role: "user",
        content: userMsg.content,
      });
    }

    const completion = await groq().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "Maaf, tidak bisa menjawab.";

    await supabase.from("tr_chat_message").insert({
      session_id: sid,
      role: "assistant",
      content: reply,
    });

    await supabase
      .from("tr_chat_session")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", sid);

    return Response.json({ reply, sessionId: sid });
  } catch (error: any) {
    console.error("Chat POST error:", error?.message || error);
    return Response.json(
      { error: error?.message || "Gagal memproses pesan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase
    .from("tr_chat_session")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return Response.json({ error: "Gagal menghapus" }, { status: 500 });
  }
  return Response.json({ success: true });
}
