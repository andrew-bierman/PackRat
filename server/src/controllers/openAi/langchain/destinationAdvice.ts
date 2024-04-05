import { OpenAI } from 'langchain/llms/openai';
import { type AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import { checkAPIKey } from '.';

const llm: OpenAI = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: 150,
});

export async function destinationAdvice(
  month: string,
  destination: string,
): Promise<DestinationAdviceResponse> {
  await checkAPIKey();
  const tripDetails: string = `${destination} in ${month}`;
  const systemMessage: string = `You are a helpful Outdoor Adventure Planning assistant for PackRat. The user is planning a trip to ${tripDetails}.`;
  try {
    const adviceTypes = getAdviceTypes(tripDetails);
    const advicePromises: Array<Promise<Record<string, string>>> =
      adviceTypes.map(async (advice: { key: string; prompt: string }) =>
        getResponse(advice.prompt, systemMessage).then((response) => ({
          [advice.key]: response,
        })),
      );
    const adviceResults: Array<Record<string, string>> = await Promise.all(
      advicePromises,
    );

    // Initialize DestinationAdviceResponse with default values
    const initialResponse: DestinationAdviceResponse = {
      tripAdvice: '',
      avoidPlaces: '',
      weatherAdvice: '',
      placesToVisit: '',
      costAdvice: '',
      transportationAdvice: '',
      packingAdvice: '',
      activitiesAdvice: '',
      foodAdvice: '',
      entertainmentAdvice: '',
      shoppingAdvice: '',
      safetyHealthAdvice: '',
      culturalEtiquette: '',
      languageAssistance: '',
      emergencyContacts: '',
      localTransportOptions: '',
      visaEntryRequirements: '',
      culinarySpecialties: '',
      festivalsEvents: '',
      accommodationTips: '',
      localLaws: '',
      connectivityCommunication: '',
      ecoFriendlyTravel: '',
      travelInsurance: '',
      error: '',
    };

    const result: DestinationAdviceResponse =
      adviceResults.reduce<DestinationAdviceResponse>(
        (acc, current) => ({ ...acc, ...current }),
        initialResponse,
      );

    return result;
  } catch (error) {
    console.error('Error in DestinationAdvice:', error);
    const errorResponse: Partial<DestinationAdviceResponse> = {
      error: "Sorry, I'm unable to provide travel advice at the moment.",
    };
    return errorResponse as DestinationAdviceResponse;
  }
}

async function getResponse(
  userMessage: string,
  systemMessage: string,
): Promise<string> {
  const messages = [
    new HumanMessage({ content: userMessage }),
    new SystemMessage({ content: systemMessage }),
  ];
  try {
    const response: string = await predictMessages(messages);
    return response.trim();
  } catch (error) {
    console.error('Error in getResponse:', error);
    throw new Error('Error obtaining response from OpenAI');
  }
}

async function predictMessages(
  messages: Array<AIMessage | HumanMessage | SystemMessage>,
): Promise<string> {
  try {
    return (await llm.predictMessages(messages)).content.toString().trim();
  } catch (error) {
    console.error('Error in predictMessages:', error);
    throw new Error('Error predicting messages with OpenAI');
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

function getAdviceTypes(tripDetails: string) {
  const adviceTypes = [
    {
      key: 'tripAdvice',
      prompt: `Provide general travel advice for ${tripDetails}.`,
    },
    {
      key: 'avoidPlaces',
      prompt: `What are the places to avoid in ${tripDetails}?`,
    },
    {
      key: 'weatherAdvice',
      prompt: `Provide weather advice for ${tripDetails}.`,
    },
    {
      key: 'placesToVisit',
      prompt: `Recommend top places to visit in ${tripDetails}.`,
    },
    {
      key: 'costAdvice',
      prompt: `Provide cost and budgeting advice for visiting ${tripDetails}.`,
    },
    {
      key: 'transportationAdvice',
      prompt: `Provide transportation advice for visiting ${tripDetails}.`,
    },
    {
      key: 'packingAdvice',
      prompt: `Provide packing advice for visiting ${tripDetails}.`,
    },
    {
      key: 'activitiesAdvice',
      prompt: `Provide activities advice for visiting ${tripDetails}.`,
    },
    {
      key: 'foodAdvice',
      prompt: `Provide food advice for visiting ${tripDetails}.`,
    },
    {
      key: 'entertainmentAdvice',
      prompt: `Provide entertainment advice for visiting ${tripDetails}.`,
    },
    {
      key: 'shoppingAdvice',
      prompt: `Provide shopping advice for visiting ${tripDetails}.`,
    },
    {
      key: 'safetyHealthAdvice',
      prompt: `Provide safety and health advice for visiting ${tripDetails}.`,
    },
    {
      key: 'culturalEtiquette',
      prompt: `Provide advice on local customs and cultural etiquette for visiting ${tripDetails}.`,
    },
    {
      key: 'languageAssistance',
      prompt: `Provide language assistance and communication tips for visiting ${tripDetails}.`,
    },
    {
      key: 'emergencyContacts',
      prompt: `Provide emergency contact information and advice for dealing with emergencies in ${tripDetails}.`,
    },
    {
      key: 'localTransportOptions',
      prompt: `Detail local transportation options and tips for getting around in ${tripDetails}.`,
    },
    {
      key: 'visaEntryRequirements',
      prompt: `Explain visa and entry requirements for travelers visiting ${tripDetails}.`,
    },
    {
      key: 'culinarySpecialties',
      prompt: `Discuss culinary specialties and dietary advice for ${tripDetails}.`,
    },
    {
      key: 'festivalsEvents',
      prompt: `Highlight any festivals or special events happening in ${tripDetails}.`,
    },
    {
      key: 'accommodationTips',
      prompt: `Provide advice on choosing accommodations in ${tripDetails}.`,
    },
    {
      key: 'localLaws',
      prompt: `Inform about local laws and regulations that travelers should be aware of in ${tripDetails}.`,
    },
    {
      key: 'connectivityCommunication',
      prompt: `Offer advice on connectivity and communication options in ${tripDetails}.`,
    },
    {
      key: 'ecoFriendlyTravel',
      prompt: `Give tips on eco-friendly and sustainable travel practices in ${tripDetails}.`,
    },
    {
      key: 'travelInsurance',
      prompt: `Advise on travel insurance options and considerations for visiting ${tripDetails}.`,
    },
  ];
  return adviceTypes;
}
