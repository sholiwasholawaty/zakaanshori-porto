export const site = {
  name: "Zaka Anshori",
  domain: "zakaanshori.com",
  headline: "Independent Founder & Builder.",
  tagline: "Building what\u2019s next.",
  aboutTitle: "Not just using AI.",
  aboutSubtitle: "Building with it.",
  aboutBody:
    "Zaka Anshori is an independent founder and builder, focused on creating digital products and AI systems that solve real problems.",
  aboutHref: "https://wa.me/6281210004453",
};

export const products = [
  { id: "crm", title: "Sales & CRM", desc: "Agentic AI for smarter sales process.", href: "#" },
  { id: "hrm", title: "HRM", desc: "Agentic AI for modern human resources.", href: "#" },
  { id: "roundtable", title: "AI Roundtable", desc: "Multi-AI discussion platform.", href: "#" },
] as const;

export const contact = {
  label: "Diskusi kebutuhanmu",
  href: "https://wa.me/6281210004453",
};

export const pricing = {
  title: "Pricing.",
  subtitle: "Dua cara memakai produk saya, sesuai kebutuhan tim kamu.",
  note: "Harga di atas adalah kisaran. Angka final ditentukan setelah kita membahas kebutuhan dan alur kerja perusahaan kamu.",
  plans: [
    {
      id: "managed",
      name: "Terima Beres",
      tag: "Managed",
      audience:
        "Perusahaan tanpa tim IT yang tidak mau memikirkan server, dan hanya ingin aplikasinya berjalan lancar.",
      prices: [
        { label: "Setup awal (sekali bayar)", value: "Rp 5 – 10 juta", hint: "Instalasi di domain milikmu" },
        { label: "Langganan", value: "Rp 1 – 2,5 juta / bulan", hint: "Termasuk perawatan" },
      ],
      includes: [
        "Hosting dan server disiapkan",
        "Uptime dijaga",
        "Backup rutin",
        "Perbaikan bug tanpa biaya tambahan",
      ],
    },
    {
      id: "custom",
      name: "Full Custom Development",
      tag: "Custom",
      audience:
        "Perusahaan dengan alur kerja rumit yang butuh aplikasi dirombak atau ditambah fitur agar cocok dengan SOP mereka.",
      prices: [
        { label: "Pengembangan (aplikasi dasar + kustomisasi)", value: "Rp 40 – 100 juta+", hint: "Tergantung jumlah fitur dan waktu pengerjaan" },
        { label: "Perawatan setelah garansi (opsional)", value: "Rp 1 – 2,5 juta / bulan", hint: "" },
      ],
      includes: [
        "Kustomisasi fitur sesuai SOP perusahaan",
        "Garansi perbaikan bug gratis 1 – 3 bulan pertama",
        "Perawatan bulanan bisa dilanjutkan setelah garansi",
      ],
    },
  ],
};
