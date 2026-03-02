import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    try {
        // 1. Verify admin role
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Parse form data
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const uploadedUrls: string[] = [];
        const { uploadFileBuffer, getFilePresignedUrl } = await import("@/lib/minio");

        // 3. Process each file
        for (const file of files) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                continue;
            }

            // Read file data
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.name);
            // Clean original filename (remove spaces, special chars)
            const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
            const filename = `${cleanName}-${uniqueSuffix}${ext}`;

            // Upload via MinIO
            await uploadFileBuffer(buffer, filename, file.type);

            // Get Presigned URL valid for 1 hour to return to client
            const presignedUrl = await getFilePresignedUrl(filename);

            // Add public URL to result array
            uploadedUrls.push(presignedUrl);
        }

        return NextResponse.json({ urls: uploadedUrls });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload files" },
            { status: 500 }
        );
    }
}
