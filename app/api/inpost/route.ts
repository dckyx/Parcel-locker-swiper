import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();

  const inpost = `https://api-global-points.easypack24.net/v1/points?${query}`;

  try {
    const res = await fetch(inpost);

    if (!res.ok) {
      return NextResponse.json(
        { error: "An error occured while downloading api data" },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
