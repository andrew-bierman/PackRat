import OpenAI from 'openai';
import Instructor from '@instructor-ai/instructor';
import { User } from '../../drizzle/methods/User';
import { getPackByIdService } from '../pack/getPackByIdService';
import { getPackSuggestionPrompt } from './referredItemInformation';
import { PackSchema } from './zodSchema';

/**
 * Retrieves AI response for a given user input in a conversation.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @param {string} itemTypeId - The ID of the conversation.
 * @param {string} userInput - The user input in the conversation.
 * @returns {Object} - The AI response and the updated conversation.
 */

export const getAISuggestionService = async (
  userId: string,
  itemTypeId: string,
  type: string,
  openAIAPIKey: string,
): Promise<object> => {
  if (!openAIAPIKey) {
    throw new Error(
      'Failed to get response from AI. OPENAI_API_KEY is not set.',
    );
  }
  const userClass = new User();

  const openai = new OpenAI({
    apiKey: openAIAPIKey,
  });

  // Apply the patch to the OpenAI client
  const client = Instructor({
    client: openai,
    mode: 'TOOLS',
  });

  const refiner = Instructor({
    client: openai,
    mode: 'FUNCTIONS',
  });

  const user = await userClass.findUser({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  let itemInfo;
  switch (type) {
    case 'trip':
      console.log('trip');
      // info = await getTripInformation(itemTypeId);
      break;
    case 'pack':
      itemInfo = await getPackSuggestionPrompt(itemTypeId);
      break;
    default:
      console.log('trip');
      throw new Error(`Invalid type: ${itemTypeId}`);
  }

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Analyze and Optimize the user pack as per the following guidelines:
            -Use the pack details to give personalized recommendations and optimizations.
            -improve the pack items considering safety, comfort, and efficiency.
            -Suggest a new Item that might reduce excessive weight, such as substituting heavy items with lighter alternatives (e.g., a water filter instead of carrying excessive water).
            -add essential items that might be missing from the pack.

            Here are some good guidelines to follow:
            General:
                Food:
                Meals: Trail-friendly meals (freeze-dried, instant)
                Snacks: Trail mix, energy bars, jerky, dried fruit
                Water:
                Hydration: Water bottles or hydration bladder
                Purification: Water filter or purification tablets
                Essentials:
                Navigation: Map, compass, GPS device
                Clothing: Weather-appropriate layers, hat, hiking boots, extra socks
                Safety: First aid kit, personal medications, sunscreen, insect repellent
                Gear: Comfortable backpack, headlamp with extra batteries, multi-tool
                Documents: ID, permits, emergency contact info
                Communication: Cell phone, portable charger or power bank

            Food Guide:

                Hey there, adventurers! Ready for your next hike? Here is a quick and tasty guide to fuel your journey:
                Easy Snacks:
                Trail Mix: Nuts, seeds, dried fruit, and chocolate bits.
                Energy Bars: Natural ingredient bars.
                Dried Fruits: Apricots, apple slices, raisins, dates.
                Nuts & Seeds: Almonds, walnuts, sunflower seeds.
                Lunch Options:
                Sandwiches: Nut butter, cheese, or lean meat.
                Wraps: Whole-grain tortillas with hummus, veggies, or protein.
                Cheese & Crackers: Hard cheese and whole-grain crackers.
                Quick Meals:
                Instant Noodles/Couscous: Quick-cook with hot water.
                Dehydrated Meals: Lightweight, just add water.

            Essentials Guide:
                Navigation: Map & Compass,GPS Device
                Clothing: Quick-Dry Layers, Waterproof Jacket, Extra Socks, Hat and Sunglasses
                Safety Gear: First Aid Kit, Multi-Tool/Knife, Whistle
                Sun Protection: Sunscreen, Hat & Sunglasses
                Light: Headlamp/Flashlight
                Emergency Shelter: Bivy Sack/Space Blanket
                Fire: Matches/Lighter
                Backpack: Comfortable Hiking Backpack

            Water Guide:
                Water Bottles/Reservoir: Carry at least 2-3 liters.
                Purification Straw: Lightweight and effective.
                Portable Water Filter: Perfect for streams and lakes.

            What to Pack and What's Too Heavy:

                Lightweight Food Options:

                  Snacks:

                    Instead of whole nuts, consider packing trail mix or nut butter packets. 🥜
                    Switch granola bars with lighter energy gels or fruit leathers. 🍇
                  Meals:

                    Replace cans of food with dehydrated meals or instant soup mixes. 🥫 ➡️🍲
                    Use whole grain wraps instead of sandwiches with heavy bread to reduce weight. 🌯
                  Fruits:

                    Sub out whole fruits for dried fruits like apricots, raisins, or banana chips. 🍎 ➡️🍏
                    Consider fruit strips or fruit leather instead of heavier fresh fruit. 🍑
                  Hydration:

                    Instead of carrying multiple bottles of water, use a lightweight water filter to refill from natural sources. 🚰
                    Carry electrolyte powders instead of pre-made drinks. 💧➡️⚡
                  Tips for Packing Light:

                  Portion Control: Pack smaller portions of high-calorie, nutrient-dense foods.
                  Resealable Bags: Use ziplock bags for organizing and reducing the weight of packaging.
                  Multipurpose Items: Bring items that can serve multiple purposes (e.g., a pack towel that doubles as a napkin).
              
            * Packing lightly yet efficiently can make hike more pleasant. Make sure to suggest these lightweight food options to pack.
            * Give a good reasoning and then Finally 'ALWAYS' Give the suggested and improved pack in the users original request format,
              remember the items in the pack array of of strings "name (weight and unit of measurement(lb, oz, kg, g), quantity pcs, category: category name)"
              just like the user prompt. and category is of three Either Food, Water or Essentials.`,
      },
      { role: 'user', content: itemInfo },
    ],
  });

  const aiResponse = response.choices?.[0]?.message?.content?.trim() || '';

  const refined = await refiner.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: aiResponse,
      },
    ],
    response_model: { schema: PackSchema, name: 'Pack' },
    max_retries: 2,
  });

  return {
    aiResponse,
    refined,
  };
};
