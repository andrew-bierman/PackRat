import { OpenAI } from "langchain/llms/openai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { checkAPIKey } from ".";

const llm: OpenAI = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
    maxTokens: 150,
});

export async function destinationAdvice(month: string, destination: string) {
    await checkAPIKey()
    const tripDetails: string = `${destination} in ${month}`
    const systemMessage: string = `You are a helpful Outdoor Adventure Planning assistant for PackRat. The user is planning a trip to ${tripDetails}.`;
    try {
        const result: DestinationAdviceResponse = {
            tripAdvice: await getResponse(`Provide general travel advice for ${tripDetails}.`, systemMessage),
            avoidPlaces: await getResponse(`What are the places to avoid in ${tripDetails}?`, systemMessage),
            weatherAdvice: await getResponse(`Provide weather advice for ${tripDetails}.`, systemMessage),
            placesToVisit: await getResponse(`Recommend top places to visit in ${tripDetails}.`, systemMessage),
            costAdvice: await getResponse(`Provide cost and budgeting advice for visiting ${tripDetails}.`, systemMessage),
            transportationAdvice: await getResponse(`Provide transportation advice for visiting ${tripDetails}.`, systemMessage),
            packingAdvice: await getResponse(`Provide packing advice for visiting ${tripDetails}.`, systemMessage),
            activitiesAdvice: await getResponse(`Provide activities advice for visiting ${tripDetails}.`, systemMessage),
            foodAdvice: await getResponse(`Provide food advice for visiting ${tripDetails}.`, systemMessage),
            entertainmentAdvice: await getResponse(`Provide entertainment advice for visiting ${tripDetails}.`, systemMessage),
            shoppingAdvice: await getResponse(`Provide shopping advice for visiting ${tripDetails}.`, systemMessage),
            safetyHealthAdvice: await getResponse(`Provide safety and health advice for visiting ${tripDetails}.`, systemMessage),
            culturalEtiquette: await getResponse(`Provide advice on local customs and cultural etiquette for visiting ${tripDetails}.`, systemMessage),
            languageAssistance: await getResponse(`Provide language assistance and communication tips for visiting ${tripDetails}.`, systemMessage),
            emergencyContacts: await getResponse(`Provide emergency contact information and advice for dealing with emergencies in ${tripDetails}.`, systemMessage),
            localTransportOptions: await getResponse(`Detail local transportation options and tips for getting around in ${tripDetails}.`, systemMessage),
            visaEntryRequirements: await getResponse(`Explain visa and entry requirements for travelers visiting ${tripDetails}.`, systemMessage),
            culinarySpecialties: await getResponse(`Discuss culinary specialties and dietary advice for ${tripDetails}.`, systemMessage),
            festivalsEvents: await getResponse(`Highlight any festivals or special events happening in ${tripDetails}.`, systemMessage),
            accommodationTips: await getResponse(`Provide advice on choosing accommodations in ${tripDetails}.`, systemMessage),
            localLaws: await getResponse(`Inform about local laws and regulations that travelers should be aware of in ${tripDetails}.`, systemMessage),
            connectivityCommunication: await getResponse(`Offer advice on connectivity and communication options in ${tripDetails}.`, systemMessage),
            ecoFriendlyTravel: await getResponse(`Give tips on eco-friendly and sustainable travel practices in ${tripDetails}.`, systemMessage),
            travelInsurance: await getResponse(`Advise on travel insurance options and considerations for visiting ${tripDetails}.`, systemMessage),
        };
        return <DestinationAdviceResponse>result
    } catch (error) {
        console.error("Error in DestinationAdvice:", error);
        return <DestinationAdviceResponse>{
            error: "Sorry, I'm unable to provide travel advice at the moment."
        };
    }
}

async function getResponse(userMessage: string, systemMessage: string): Promise<string> {
    const messages = [new HumanMessage({ content: userMessage }), new SystemMessage({ content: systemMessage })];
    try {
        const response: string = await predictMessages(messages);
        return <string>response.trim();
    } catch (error) {
        console.error("Error in getResponse:", error);
        throw new Error("Error obtaining response from OpenAI");
    }
}

async function predictMessages(messages: (AIMessage | HumanMessage | SystemMessage)[]): Promise<string> {
    try {
        return <string>(await llm.predictMessages(messages)).content.toString().trim();
    } catch (error) {
        console.error("Error in predictMessages:", error);
        throw new Error("Error predicting messages with OpenAI");
    }
}

export interface DestinationAdviceResponse {
    tripAdvice: string;
    avoidPlaces: string;
    weatherAdvice: string;
    placesToVisit: string;
    costAdvice: string;
    transportationAdvice: string;
    packingAdvice: string;
    activitiesAdvice: string;
    foodAdvice: string;
    entertainmentAdvice: string;
    shoppingAdvice: string;
    safetyHealthAdvice: string;
    culturalEtiquette: string;
    languageAssistance: string;
    emergencyContacts: string;
    localTransportOptions: string;
    visaEntryRequirements: string;
    culinarySpecialties: string;
    festivalsEvents: string;
    accommodationTips: string;
    localLaws: string;
    connectivityCommunication: string;
    ecoFriendlyTravel: string;
    travelInsurance: string;
    error?: string;
}