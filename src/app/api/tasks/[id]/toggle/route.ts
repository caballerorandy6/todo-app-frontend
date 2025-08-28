import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: "PATCH",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to toggle task" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error toggling task:", error);
    return NextResponse.json(
      { error: "Failed to toggle task" },
      { status: 500 }
    );
  }
}
