import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.JWT_SECRET as string;

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.email || !body.password) {
        return NextResponse.json({
            message: "Email or Password is missing",
        }, {status: 400});
    }
    const token = jwt.sign({ email: body.email, password: body.password }, secretKey);
    return NextResponse.json({
        data: {
            token,
        },
    })
}

export async function GET(request: NextRequest) {
    const body = await request.json();
    await new Promise((r)=> setTimeout(() => r, 2000))
    console.log(body);
    return NextResponse.json({
        data:"Protected Data",
    })
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const header = request.headers.get("Authorization");
    if (header === null) {
        return NextResponse.json({
            message: "Unauthorized",
        }, {status: 401});
    }
    // const token = header?.split(" ")[1];
    await new Promise((r)=> setTimeout(() => r, 2000))
    console.log(body);
    return NextResponse.json({
        message: "UPDATE SUCCESS",
    })
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const header = request.headers.get("Authorization");
    if (header === null) {
        return NextResponse.json({
            message: "Unauthorized",
        }, {status: 401});
    }
    // const token = header?.split(" ")[1];
    await new Promise((r)=> setTimeout(() => r, 2000))
    console.log(body);
    return NextResponse.json({
        message: "Delete SUCCESS",
    })
}   


