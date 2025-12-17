import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST() {
  try {
    const projectRoot = process.cwd();

    // Define the files to reset
    const filesToReset = [
      {
        default: path.join(projectRoot, "defaults", "page.default.tsx"),
        target: path.join(projectRoot, "app", "page.tsx"),
      },
      {
        default: path.join(projectRoot, "defaults", "globals.default.css"),
        target: path.join(projectRoot, "app", "globals.css"),
      },
    ];

    // Reset each file
    for (const file of filesToReset) {
      const defaultContent = await fs.readFile(file.default, "utf-8");
      await fs.writeFile(file.target, defaultContent, "utf-8");
    }

    return NextResponse.json({
      success: true,
      message: "Sandbox reset successfully",
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reset sandbox" },
      { status: 500 }
    );
  }
}
