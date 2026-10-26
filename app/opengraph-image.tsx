import { ImageResponse } from "next/og";

export const alt = "Zaka Anshori \u2014 Independent Founder & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 48 }}>ZA</div>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2 }}>Zaka Anshori.</div>
        <div style={{ fontSize: 44, color: "#9a9a9a", marginTop: 12 }}>Independent Founder & Builder.</div>
        <div style={{ fontSize: 36, color: "#6a6a6a", marginTop: 8 }}>Building what&apos;s next.</div>
      </div>
    ),
    size
  );
}
