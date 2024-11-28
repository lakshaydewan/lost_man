import { DATA } from "@/lib/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: DATA = await request.json();

        let response;
        switch (body.method) {
            case "POST":
                try {
                    const start = performance.now()
                    response = await axios.post(body.url, body.body, {
                        headers: {
                            Authorization: body.authHeaders
                        }
                    });
                    const end = performance.now()
                    const Time = Math.floor(end - start) + "ms";
                    const dataSize = Buffer.byteLength(JSON.stringify(response.data));
                    const status = response.status + response.statusText
                    return NextResponse.json({
                        data: response.data,
                        headers: response.headers,
                        size: dataSize,
                        statusCode: status,
                        responseTime: Time
                    });
                } catch (error) {
                    console.log("error", error);
                    return NextResponse.json({
                        message: "Something Went Wrong !!",
                        error: error
                    }) 
                }

            case "GET":
                try {
                    const start = performance.now()
                    response = await axios.get(body.url, {
                        headers: {
                            Authorization: body.authHeaders
                        }
                    });
                    const end = performance.now()
                    const Time = Math.floor(end - start) + "ms";
                    const dataSize = Buffer.byteLength(JSON.stringify(response.data));
                    const status = response.status + response.statusText
                    console.log("response", response.data);
                    return NextResponse.json({
                        data: response.data,
                        headers: response.headers,
                        size: dataSize,
                        statusCode: status,
                        responseTime: Time
                    });
                } catch (error) {
                    return NextResponse.json({
                        message: "Something Went Wrong !!",
                        error: error
                    }) 
                }

            case "PUT":
                try {
                    const start = performance.now()
                    response = await axios.post(body.url, body.body, {
                        headers: {
                            Authorization: body.authHeaders
                        }
                    });
                    const end = performance.now()
                    const Time = Math.floor(end - start) + "ms";
                    const dataSize = Buffer.byteLength(JSON.stringify(response.data));
                    const status = response.status + response.statusText
                    return NextResponse.json({
                        data: response.data,
                        headers: response.headers,
                        size: dataSize,
                        statusCode: status,
                        responseTime: Time
                    });
                } catch (error) {
                    console.log("error", error);
                    return NextResponse.json({
                        message: "Something Went Wrong !!",
                        error: error
                    }) 
                }

            case "DELETE":
                try {
                    const start = performance.now()
                    response = await axios.delete(body.url, {
                        headers: {
                            Authorization: body.authHeaders
                        }
                    });
                    const end = performance.now()
                    const Time = Math.floor(end - start) + "ms";
                    const dataSize = Buffer.byteLength(JSON.stringify(response.data));
                    const status = response.status + response.statusText
                    return NextResponse.json({
                        data: response.data,
                        headers: response.headers,
                        size: dataSize,
                        statusCode: status,
                        responseTime: Time
                    });
                } catch (error) {
                    return NextResponse.json({
                        message: "Something Went Wrong !!",
                        error: error
                    })
                }

            default:
                return NextResponse.json({ message: "Invalid method" }, { status: 400 });
        }
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export function GET(request: NextRequest) {
    const req = request.body;
    console.log(req);

    return NextResponse.json({
        message: "Success",
    })
}