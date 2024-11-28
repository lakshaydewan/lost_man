import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), 'public', 'assets', 'data.txt');
const secretKey: string = process.env.JWT_SECRET as string

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body?.email || !body?.password) {
            return NextResponse.json(
               { 
                data: {
                    message: "Email or Password is missing",
                    }
                }
            );
        }

        // Generate the JWT (exclude sensitive data like password)
        const token = jwt.sign({ email: body.email }, secretKey, { expiresIn: '1h' });

        // Write the token to a file
        await fs.writeFile(filePath, token, 'utf8');
        console.log('File written successfully');

        return NextResponse.json(
            { data: { token } },
            { status: 201 }
        );
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json(
            {
                data: { 
                    message: "Internal Server Error" },
                    status: 500 
            }
        );
    }
}

export async function GET(request: NextRequest) {
    const authHeaders = request.headers.get("Authorization");
    console.log(authHeaders);
    if (!authHeaders) {
        console.log("No Authorization Header");
        return NextResponse.json({
            BAD_REQUEST : "No Authorization Header",
        });
    }
    const token = authHeaders?.split(" ")[1];

    try {
        const tokenPayload = jwt.verify(token, secretKey);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
        return NextResponse.json({ data: "Protected Data", credential: tokenPayload }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            BAD_REQUEST: "Token verification failed get a new token !!",
            error: error
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const header = request.headers.get("Authorization");

        if (!header) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
        console.log(body);

        return NextResponse.json({ message: "UPDATE SUCCESS" }, { status: 200 });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const header = request.headers.get("Authorization");

        if (!header) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
        console.log(body);

        return NextResponse.json({ message: "Delete SUCCESS" }, { status: 200 });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
