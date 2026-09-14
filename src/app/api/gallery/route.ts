import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const galleryFolders = [
  {
    folder: "wedding",
    category: "Weddings",
  },
  {
    folder: "birthday",
    category: "Birthdays",
  },
  {
    folder: "events",
    category: "Events",
  },
];

const supportedExtensions =
  /\.(jpg|jpeg|png|webp|gif|avif)$/i;

export async function GET() {
  try {
    const galleryPath = path.join(
      process.cwd(),
      "public",
      "images",
      "gallery"
    );

    const images: {
      id: number;
      src: string;
      category: string;
      name: string;
    }[] = [];

    let id = 1;

    for (const { folder, category } of galleryFolders) {
      const folderPath = path.join(galleryPath, folder);

      if (!fs.existsSync(folderPath)) {
        continue;
      }

      const files = fs
        .readdirSync(folderPath)
        .filter((file) =>
          supportedExtensions.test(file)
        )
        .sort();

      for (const file of files) {
        images.push({
          id,
          src: `/images/gallery/${folder}/${encodeURIComponent(file)}`,
          category,
          name: file,
        });

        id++;
      }
    }

    return NextResponse.json(images, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Gallery API error:", error);

    return NextResponse.json(
      {
        error: "Unable to load gallery images",
      },
      {
        status: 500,
      }
    );
  }
}