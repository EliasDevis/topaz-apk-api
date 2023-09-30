import { Api } from "api";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { TopazMessage } from "interfaces/TopazMessage";
import { TopazRegisterOptions, TopazRegisterPayload, TopazRegisterResponse } from "interfaces/TopazRegister";

export async function registerDevice(payload: TopazRegisterOptions): Promise<void> {
    const body = plainToInstance(TopazRegisterPayload, payload)


    const response = await Api.post(
        "/device/register", 
        instanceToPlain(body), 
        TopazRegisterResponse
    )


    if (!response.status) throw new Error("Bad status")
}

export async function getDeviceMessages(token: string): Promise<TopazMessage[]> {
    return Api.get<TopazMessage[]>("/device/messages/" + token, TopazMessage)
}